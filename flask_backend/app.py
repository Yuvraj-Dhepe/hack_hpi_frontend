from flask import Flask, request, jsonify
import os
import pandas as pd
from flask_cors import CORS
from io import StringIO
import datetime
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from backend.backend_wrapper import backend_call

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Create a directory to store uploaded CSV files
UPLOAD_DIR = 'uploads'
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.route('/api/upload-csv', methods=['POST'])
def upload_csv():
    try:
        # Check if the request contains CSV data
        if 'csv_data' not in request.json:
            return jsonify({'error': 'No CSV data provided'}), 400
        
        csv_data = request.json['csv_data']
        user_id = request.json.get('user_id', 'unknown')
        with_feedback = request.json.get('with_feedback', False)
        
        # Create a unique filename based on whether it includes feedback
        if with_feedback:
            filename = "tinnitus_data_feedback.csv"
        else:
            filename = "tinnitus_data.csv"
            
        filepath = os.path.join(UPLOAD_DIR, filename)
        
        # Parse the CSV string into a pandas DataFrame
        new_df = pd.read_csv(StringIO(csv_data))
        
        # Check if file already exists
        if os.path.exists(filepath):
            # Read existing data
            existing_df = pd.read_csv(filepath)
            # Append new data to existing data
            combined_df = pd.concat([existing_df, new_df], ignore_index=True)
        else:
            # If file doesn't exist, use only the new data
            combined_df = new_df
        
        # Save the combined DataFrame to a CSV file
        combined_df.to_csv(filepath, index=False)
        
        # Optional: Print summary statistics
        print(f"Received data for user {user_id} with feedback={with_feedback}:")
        print(f"Shape: {new_df.shape}")
        print(f"Columns: {new_df.columns.tolist()}")
        print(f"Total records in file: {len(combined_df)}")
        
        return jsonify({
            'success': True,
            'message': 'CSV data received and saved successfully',
            'filename': filename,
            'record_count': len(combined_df),
            'with_feedback': with_feedback
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/get-analysis', methods=['GET'])
def get_analysis():
    try:
        # Get user_id from query parameters
        user_id = request.args.get('user_id')
        if not user_id:
            print("Error: No user_id provided in request")
            return jsonify({
                'error': 'No user_id provided',
                'message': 'Please provide a user_id as a query parameter'
            }), 400

        print(f"Processing analysis request for user: {user_id}")

        # Read the CSV file containing all user data
        filepath = os.path.join(UPLOAD_DIR, "tinnitus_data.csv")
        if not os.path.exists(filepath):
            print(f"Error: No data file found at {filepath}")
            return jsonify({
                'error': 'No data available for analysis',
                'message': 'Please upload data first'
            }), 404

        # Read the database
        database_pull = pd.read_csv(filepath)
        print(f"Found {len(database_pull)} records in database")

        # Check if user exists in database
        if user_id not in database_pull['uid'].values:
            print(f"Error: User {user_id} not found in database")
            return jsonify({
                'error': 'User not found',
                'message': f'No data found for user {user_id}'
            }), 404

        # Run the backend analysis
        _, diagnosis_probabilities = backend_call(user_id, database_pull)
        print(f"Successfully generated analysis for user {user_id}")
        
        return jsonify(diagnosis_probabilities), 200
        
    except Exception as e:
        print(f"Error in get_analysis: {str(e)}")
        return jsonify({
            'error': 'Analysis error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

from flask import Flask, request, jsonify
import os
import pandas as pd
from flask_cors import CORS
from io import StringIO
import datetime

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
        
        # Create a unique filename with user_id
        filename = f"tinnitus_data.csv"
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
        print(f"Received data for user {user_id}:")
        print(f"Shape: {new_df.shape}")
        print(f"Columns: {new_df.columns.tolist()}")
        print(f"Total records in file: {len(combined_df)}")
        
        return jsonify({
            'success': True,
            'message': 'CSV data received and saved successfully',
            'filename': filename,
            'record_count': len(combined_df)
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/get-analysis', methods=['GET'])
def get_analysis():
    try:
        # Return mock diagnosis probabilities
        diagnosis_probabilities = {
            "d1": 0.65,
            "d2": 0.21,
            "d3": 0.05,
            "d4": 0.13,
            "d5": 0.10,
            "d6": 0.17
        }
        
        return jsonify(diagnosis_probabilities), 200
        
    except Exception as e:
        return jsonify({
            'error': f"Analysis error: {str(e)}"
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

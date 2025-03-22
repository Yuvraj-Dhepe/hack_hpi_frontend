import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
import { getQuestionnaireResponses } from './database';
import { generateUID, getUserInfo } from './helpers';

// CSV file path in app's documents directory
const CSV_FILE_PATH = FileSystem.documentDirectory ? FileSystem.documentDirectory + 'tinnitus_data.csv' : null;

// Convert responses array to CSV string
const convertToCSV = (responses) => {
  // Define CSV headers
  const headers = ['id', 'uid', 'timestamp', 'age', 'sex', 'y1', 'x1', 'x2', 'y2'];
  
  // Create header row
  let csvContent = headers.join(',') + '\n';
  
  // Add data rows
  responses.forEach(response => {
    const row = [
      response.id,
      response.uid,
      response.timestamp,
      response.age,
      response.sex,
      response.y1,
      response.x1,
      response.x2,
      response.y2
    ];
    
    // Convert each value to string and handle commas
    const formattedRow = row.map(value => {
      const stringValue = String(value || '');
      return stringValue.includes(',') ? `"${stringValue}"` : stringValue;
    });
    
    csvContent += formattedRow.join(',') + '\n';
  });
  
  return csvContent;
};

// Update CSV file with latest data
export const updateCSVFile = async () => {
  // Skip file operations on web platform
  if (Platform.OS === 'web') {
    console.log('CSV file operations not supported on web');
    return true;
  }
  
  try {
    // Get all responses
    const responses = await getQuestionnaireResponses();
    
    if (responses.length === 0) {
      console.log('No data to export');
      return false;
    }
    
    // Convert to CSV
    const csvContent = convertToCSV(responses);
    
    // Write to file
    await FileSystem.writeAsStringAsync(CSV_FILE_PATH, csvContent);
    
    console.log('CSV file updated successfully at:', CSV_FILE_PATH);
    return true;
  } catch (error) {
    console.error('Error updating CSV file:', error);
    return false;
  }
};

// Upload CSV data to server
export const uploadCSVToServer = async (serverUrl = 'http://192.168.178.11:5000/api/upload-csv') => {
  try {
    // Get all responses
    const responses = await getQuestionnaireResponses();
    
    if (responses.length === 0) {
      console.log('No data to upload');
      return { success: false, error: 'No data to upload' };
    }
    
    // Convert to CSV
    const csvContent = convertToCSV(responses);
    
    // Get user ID for the filename
    const userInfo = await getUserInfo();
    const uid = userInfo?.name ? await generateUID(userInfo.name) : 'anonymous';
    
    console.log('Attempting to upload CSV to:', serverUrl);
    console.log('User ID:', uid);
    
    // Send the CSV data to the server
    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        csv_data: csvContent,
        user_id: uid
      }),
    });
    
    const responseData = await response.json();
    
    if (response.ok) {
      console.log('CSV data uploaded successfully:', responseData);
      return { success: true, data: responseData };
    } else {
      console.error('Error uploading CSV data:', responseData);
      return { success: false, error: responseData.error };
    }
  } catch (error) {
    console.error('Error uploading CSV data:', error);
    return { success: false, error: error.message };
  }
};

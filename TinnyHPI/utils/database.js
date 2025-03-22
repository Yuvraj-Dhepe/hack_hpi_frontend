import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateCSVFile } from './csvExport';

// Key for storing all questionnaire responses
const RESPONSES_STORAGE_KEY = 'questionnaire_responses';

// Initialize the database (create empty array if not exists)
export const initDatabase = async () => {
  try {
    const existingData = await AsyncStorage.getItem(RESPONSES_STORAGE_KEY);
    if (!existingData) {
      await AsyncStorage.setItem(RESPONSES_STORAGE_KEY, JSON.stringify([]));
    }
    console.log('Storage initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing storage:', error);
    throw error;
  }
};

// Save questionnaire response
export const saveQuestionnaireResponse = async (data) => {
  try {
    // Get existing responses
    const existingData = await AsyncStorage.getItem(RESPONSES_STORAGE_KEY);
    const responses = existingData ? JSON.parse(existingData) : [];
    
    // Add ID to the new response
    const newResponse = {
      ...data,
      id: Date.now().toString() // Simple unique ID
    };
    
    // Add new response to the array
    responses.push(newResponse);
    
    // Save updated array
    await AsyncStorage.setItem(RESPONSES_STORAGE_KEY, JSON.stringify(responses));
    console.log('Response saved successfully');
    
    // Update CSV file with the latest data
    await updateCSVFile();
    
    return true;
  } catch (error) {
    console.error('Error saving response:', error);
    throw error;
  }
};

// Get all questionnaire responses
export const getQuestionnaireResponses = async () => {
  try {
    const data = await AsyncStorage.getItem(RESPONSES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting responses:', error);
    return [];
  }
};

// Get questionnaire responses by UID
export const getResponsesByUID = async (uid) => {
  try {
    const data = await AsyncStorage.getItem(RESPONSES_STORAGE_KEY);
    const responses = data ? JSON.parse(data) : [];
    return responses.filter(response => response.uid === uid);
  } catch (error) {
    console.error('Error retrieving responses by UID:', error);
    throw error;
  }
};

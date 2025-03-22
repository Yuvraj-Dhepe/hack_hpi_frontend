import * as Crypto from 'expo-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Generate a unique ID from username
export const generateUID = async (username) => {
  try {
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      username
    );
    return hash;
  } catch (error) {
    console.error('Error generating UID:', error);
    return null;
  }
};

// Get user info from AsyncStorage
export const getUserInfo = async () => {
  try {
    const userInfoString = await AsyncStorage.getItem('userInfo');
    if (userInfoString) {
      return JSON.parse(userInfoString);
    }
    return null;
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
};

// Store questionnaire data temporarily
export const storeQuestionData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error storing ${key}:`, error);
  }
};

// Get questionnaire data
export const getQuestionData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    console.error(`Error getting ${key}:`, error);
    return null;
  }
};

// Clear temporary questionnaire data
export const clearQuestionData = async () => {
  try {
    await AsyncStorage.multiRemove([
      'question_y1',
      'question_x1',
      'question_x2',
      'question_y2'
    ]);
  } catch (error) {
    console.error('Error clearing question data:', error);
  }
};
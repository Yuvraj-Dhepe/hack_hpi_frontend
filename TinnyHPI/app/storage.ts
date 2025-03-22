import AsyncStorage from '@react-native-async-storage/async-storage';

// User data
export const saveUserData = async (userData: any) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

// Question responses
export const saveQuestionResponse = async (questionId: string, value: any) => {
  try {
    const responses = await getQuestionResponses();
    const updatedResponses = { ...responses, [questionId]: value };
    await AsyncStorage.setItem('questionResponses', JSON.stringify(updatedResponses));
  } catch (error) {
    console.error('Error saving question response:', error);
  }
};

export const getQuestionResponses = async () => {
  try {
    const responses = await AsyncStorage.getItem('questionResponses');
    return responses ? JSON.parse(responses) : {};
  } catch (error) {
    console.error('Error retrieving question responses:', error);
    return {};
  }
};

// Clear all data
export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove(['userData', 'questionResponses']);
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};
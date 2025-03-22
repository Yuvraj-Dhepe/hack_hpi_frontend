import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { router } from 'expo-router';
import Slider from '@react-native-community/slider';
import { 
  storeQuestionData, 
  getUserInfo, 
  getQuestionData, 
  generateUID,
  clearQuestionData 
} from '@/utils/helpers';
import { saveQuestionnaireResponse } from '@/utils/database';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function LastSliderQuestionScreen() {
  const [sliderValue, setSliderValue] = useState(3);
  
  const handleSave = async () => {
    try {
      // Save the last response to AsyncStorage temporarily
      await storeQuestionData('question_y2', sliderValue);
      console.log('Last slider value saved:', sliderValue);
      
      // Get all the stored question data
      const userInfo = await getUserInfo();
      if (!userInfo || !userInfo.name) {
        Alert.alert('Error', 'User information not found. Please set up your profile first.');
        router.replace('/initial-setup');
        return;
      }
      
      const uid = await generateUID(userInfo.name);
      const y1 = await getQuestionData('question_y1');
      const x1 = await getQuestionData('question_x1');
      const x2 = await getQuestionData('question_x2');
      const y2 = sliderValue;
      
      // Save all data to SQLite
      await saveQuestionnaireResponse({
        uid,
        timestamp: new Date().toISOString(),
        age: userInfo.age,
        sex: userInfo.sex,
        y1,
        x1,
        x2,
        y2
      });
      
      // Clear temporary data
      await clearQuestionData();
      
      // Navigate to the results page
      router.push('/results');
    } catch (error) {
      console.error('Error saving questionnaire data:', error);
      Alert.alert('Error', 'Failed to save your responses. Please try again.');
    }
  };
  
  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <ThemedText type="title" style={styles.questionTitle}>
          How would you rate your tinnitus-related stress today?
        </ThemedText>
        
        <View style={styles.sliderContainer}>
          <ThemedText style={styles.sliderLabel}>Low</ThemedText>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            value={sliderValue}
            onValueChange={setSliderValue}
            minimumTrackTintColor="#A1CEDC"
            maximumTrackTintColor="#D0D0D0"
            thumbTintColor="#1D3D47"
          />
          <ThemedText style={styles.sliderLabel}>High</ThemedText>
        </View>
        
        <View style={styles.valueContainer}>
          <ThemedText style={styles.valueText}>{sliderValue.toFixed(1)}</ThemedText>
        </View>
      </View>
      
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <ThemedText style={styles.buttonText}>Save & Complete</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#1D3D47',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  sliderLabel: {
    fontSize: 14,
    color: '#4A4A4A',
  },
  valueContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#A1CEDC',
    alignSelf: 'center',
  },
  valueText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1D3D47',
  },
  saveButton: {
    backgroundColor: '#A1CEDC',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 40,
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D3D47',
  },
});

import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import Slider from '@react-native-community/slider';
import { storeQuestionData } from '@/utils/helpers';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function FirstSliderQuestionScreen() {
  const [sliderValue, setSliderValue] = useState(3);
  
  const handleSave = async () => {
    // Save the response to AsyncStorage temporarily
    await storeQuestionData('question_y1', sliderValue);
    console.log('First slider value saved:', sliderValue);
    
    // Navigate to the next question
    router.push('/question-slider');
  };
  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <ThemedText type="title" style={styles.questionTitle}>
          How would you rate your overall health today?
        </ThemedText>
        
        <View style={styles.sliderContainer}>
          <ThemedText style={styles.sliderLabel}>Poor</ThemedText>
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
          <ThemedText style={styles.sliderLabel}>Excellent</ThemedText>
        </View>
        
        <View style={styles.valueContainer}>
          <ThemedText style={styles.valueText}>{sliderValue.toFixed(1)}</ThemedText>
        </View>
      </View>
      
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <ThemedText style={styles.buttonText}>Save & Continue</ThemedText>
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

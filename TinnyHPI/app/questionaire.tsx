import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styled } from 'nativewind';
import { Link } from 'expo-router';

import Question from './utility';

const levels = ["Low", "Moderate", "High"];

export default function QuestionnaireScreen() {
  const [tinnitusLevel, setTinnitusLevel] = useState(null);
  const [stressLevel, setStressLevel] = useState(null);
  const [sleepQuality, setSleepQuality] = useState(null);
  const [environmentNoise, setEnvironmentNoise] = useState(null);
  const [substanceConsumption, setSubstanceConsumption] = useState(null);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Tinnitus Questionnaire
      </ThemedText>
      
      <Question title="How loud is your tinnitus?" value={tinnitusLevel} setValue={setTinnitusLevel} inputType="buttons" />
      <Question title="How stressed are you?" value={stressLevel} setValue={setStressLevel} inputType="buttons" />
      <Question title="How would you rate your sleep?" value={sleepQuality} setValue={setSleepQuality} inputType="slider" />
      <Question title="How loud is your environment?" value={environmentNoise} setValue={setEnvironmentNoise} inputType="slider" />
      <Question title="Have you consumed caffeine, alcohol, or nicotine today?" value={substanceConsumption} setValue={setSubstanceConsumption} inputType="buttons" />
      
      <Link href="/">
        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText}>Submit</ThemedText>
        </TouchableOpacity>
      </Link>
    </ThemedView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    flex: 1,
    marginHorizontal: 5,
  },
  optionButtonSelected: {
    backgroundColor: '#1EB1FC',
  },
  optionButtonText: {
    textAlign: 'center',
    color: '#000',
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#1EB1FC',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styled } from 'nativewind';
import { Link } from 'expo-router';
import { styles, COLORS } from './styles';

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
        How are you feeling today?
      </ThemedText>
      
      <Question title="How loud is your tinnitus?" value={tinnitusLevel} setValue={setTinnitusLevel} inputType="buttonsWider"/>
      <Question title="How stressed are you?" value={stressLevel} setValue={setStressLevel} inputType="buttonsWider" />
      <Question title="How would you rate your sleep?" value={sleepQuality} setValue={setSleepQuality} inputType="slider" />
      <Question title="How loud is your environment?" value={environmentNoise} setValue={setEnvironmentNoise} inputType="slider" />
      <Question title="Have you consumed caffeine, alcohol, or nicotine today?" value={substanceConsumption} setValue={setSubstanceConsumption} inputType="buttonsWider" />
      
      <View style={{ flex: 1, justifyContent: 'start', alignItems: 'center' }}>
      <Link href="/results">
        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText}>Submit</ThemedText>
        </TouchableOpacity>
      </Link>
      </View>
    </ThemedView>
  );
}
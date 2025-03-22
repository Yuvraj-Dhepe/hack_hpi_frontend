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
    <ThemedView style={localStyle.container}>
      <ThemedText type="title" style={styles.title}>
        <b>How</b> are you feeling?
      </ThemedText>
      <ThemedView style={localStyle.innercontainer}>
      <Question title="How loud is your tinnitus?" value={tinnitusLevel} setValue={setTinnitusLevel} inputType="buttonsWider"/>
      <Question title="How stressed are you?" value={stressLevel} setValue={setStressLevel} inputType="buttonsWider" />
      <Question title="How would you rate your sleep?" value={sleepQuality} setValue={setSleepQuality} inputType="slider" />
      <Question title="How loud is your environment?" value={environmentNoise} setValue={setEnvironmentNoise} inputType="slider" />
      <Question title="Have you consumed caffeine, alcohol, or nicotine today?" value={substanceConsumption} setValue={setSubstanceConsumption} inputType="buttonsWider" />
      </ThemedView>
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

const localStyle = StyleSheet.create({
  container: {
    marginTop: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  innercontainer: {
    justifyContent: 'start',
    padding: 20,
    backgroundColor: COLORS.background,
  }
});
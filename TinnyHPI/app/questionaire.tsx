import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styled } from 'nativewind';

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
      
      <Question title="How loud is your tinnitus?" value={tinnitusLevel} setValue={setTinnitusLevel} />
      <Question title="How stressed are you?" value={stressLevel} setValue={setStressLevel} />
      <Question title="How would you rate your sleep?" value={sleepQuality} setValue={setSleepQuality} />
      <Question title="How loud is your environment?" value={environmentNoise} setValue={setEnvironmentNoise} />
      <Question title="Have you consumed caffeine, alcohol, or nicotine today?" value={substanceConsumption} setValue={setSubstanceConsumption} />
      
      <TouchableOpacity style={styles.button}>
        <ThemedText style={styles.buttonText}>Submit</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

function Question({ title, value, setValue }) {
  return (
    <View style={styles.questionContainer}>
      <ThemedText style={styles.questionText}>{title}</ThemedText>
      <View style={styles.buttonGroup}>
        {levels.map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.optionButton,
              value === level && styles.optionButtonSelected,
            ]}
            onPress={() => setValue(level)}
          >
            <ThemedText style={styles.optionButtonText}>{level}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1D3D47',
  },
  questionContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
    color: '#4A4A4A',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  optionButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  optionButtonSelected: {
    backgroundColor: '#A1CEDC',
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D3D47',
  },
  button: {
    backgroundColor: '#A1CEDC',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D3D47',
  },
});

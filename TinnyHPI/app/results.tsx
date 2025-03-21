import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export default function Results() {
  const [intervention1, setIntervention1] = useState('Intervention A');
  const [intervention2, setIntervention2] = useState('Intervention B');
  const [intervention3, setIntervention3] = useState('Intervention C');
  
  // State variables for the probabilities
  const [probability1, setProbability1] = useState(0.7);
  const [probability2, setProbability2] = useState(0.5);
  const [probability3, setProbability3] = useState(0.9);

  // Optionally fetch probabilities from your backend
  useEffect(() => {
    // Simulating a backend call to fetch probabilities
    const fetchProbabilities = async () => {
      // Replace with your backend call
      const fetchedProbabilities = { prob1: 0.7, prob2: 0.5, prob3: 0.9 };
      setProbability1(fetchedProbabilities.prob1);
      setProbability2(fetchedProbabilities.prob2);
      setProbability3(fetchedProbabilities.prob3);
    };

    fetchProbabilities();
  }, []);

  const renderProbabilityBar = (probability) => {
    return (
      <View style={styles.barContainer}>
        <View style={[styles.bar, { width: `${probability * 100}%` }]} />
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Results
      </ThemedText>
      
      <ThemedText style={styles.intervention}>
        Intervention 1: {intervention1}
      </ThemedText>
      {renderProbabilityBar(probability1)}

      <ThemedText style={styles.intervention}>
        Intervention 2: {intervention2}
      </ThemedText>
      {renderProbabilityBar(probability2)}

      <ThemedText style={styles.intervention}>
        Intervention 3: {intervention3}
      </ThemedText>
      {renderProbabilityBar(probability3)}

      <Link href="/">
        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText}>Submit</ThemedText>
        </TouchableOpacity>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  intervention: {
    fontSize: 18,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  barContainer: {
    backgroundColor: 'grey',
    borderRadius: 5,
    height: 20,
    marginBottom: 10,
    overflow: 'hidden', // Ensures the bar does not overflow
  },
  bar: {
    backgroundColor: 'green', // Change the color of the bar as needed
    height: '100%',
  },
});

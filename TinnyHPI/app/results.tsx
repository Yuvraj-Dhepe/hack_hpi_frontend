
import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { styles as globalStyles, COLORS } from './styles';
import BottomNav from './BottomNav';

export default function Results() {
  const [isLoading, setIsLoading] = useState(true);
  const [diagnosisProbabilities, setDiagnosisProbabilities] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  // Fetch probabilities from backend
  useEffect(() => {
    const fetchProbabilities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/get-analysis');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setDiagnosisProbabilities(data);
      } catch (error) {
        console.error('Error fetching analysis:', error);
        setError('Failed to load analysis. Please try again later.');
        
        // Fallback to mock data if backend is unavailable
        setDiagnosisProbabilities({
          "d1": 0.88,
          "d2": 0.21,
          "d3": 0.05,
          "d4": 0.13,
          "d5": 0.10,
          "d6": 0.17
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProbabilities();
  }, []);

  const renderProbabilityBar = (probability: number) => {
    return (
      <View style={styles.barContainer}>
        <View style={[styles.bar, { width: `${probability * 100}%` }]} />
      </View>
    );
  };

  return (
    <View style={{height: "100%"}}>
      <ThemedView style={[globalStyles.container, styles.container]}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>
            Your
          </ThemedText>
          <ThemedText type="title" style={styles.titleBold}>
            Results
          </ThemedText>
        </ThemedView>

        {isLoading ? (
          <ThemedText style={styles.loadingText}>Loading your analysis...</ThemedText>
        ) : error ? (
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        ) : (
          <View style={styles.resultsContainer}>
            {Object.entries(diagnosisProbabilities).map(([key, value]) => (
              <View key={key} style={styles.resultItem}>
                <ThemedText style={styles.intervention}>
                  {key}: {Math.round(value * 100)}%
                </ThemedText>
                {renderProbabilityBar(value)}
              </View>
            ))}
          </View>
        )}

        <Link href="/feedback">
          <TouchableOpacity style={globalStyles.button}>
            <ThemedText style={globalStyles.buttonText}>Continue</ThemedText>
          </TouchableOpacity>
        </Link>
      </ThemedView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    marginRight: 8,
  },
  titleBold: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  resultsContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  resultItem: {
    marginBottom: 15,
  },
  intervention: {
    fontSize: 16,
    marginBottom: 5,
  },
  barContainer: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: COLORS.green,
    borderRadius: 10,
  },
});

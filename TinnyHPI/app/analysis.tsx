import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function AnalysisScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalysisData();
  }, []);

  const fetchAnalysisData = async () => {
    setIsLoading(true);
    try {
      // Get the analysis data from the server
      const response = await fetch('http://192.168.178.11:5000/api/get-analysis', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        setAnalysisData(data);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch analysis');
        setAnalysisData({});
      }
    } catch (error) {
      setError('Network error: Could not connect to the server');
      console.error('Error fetching analysis:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to generate color based on percentage value
  const getColorFromValue = (value: number): string => {
    // Convert value to intensity (0-255)
    const intensity = Math.round(255 * value);
    // Use a blue gradient where higher values are more intense
    return `rgb(${255 - intensity}, ${255 - intensity}, 255)`;
  };

  const handleFinish = () => {
    // Return to home screen
    router.replace('/');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconContainer}>
          <IconSymbol name="chart.bar.fill" size={80} color="#A1CEDC" />
        </View>
        
        <ThemedText type="title" style={styles.title}>
          Tinnitus Analysis Results
        </ThemedText>
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#A1CEDC" />
            <ThemedText style={styles.loadingText}>Analyzing your data...</ThemedText>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <IconSymbol name="exclamationmark.triangle.fill" size={40} color="#F44336" />
            <ThemedText style={styles.errorText}>{error}</ThemedText>
            <TouchableOpacity style={styles.retryButton} onPress={fetchAnalysisData}>
              <ThemedText style={styles.retryText}>Retry</ThemedText>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.analysisContainer}>
            <ThemedText style={styles.sectionTitle}>
              Diagnosis Probabilities
            </ThemedText>
            
            <View style={styles.buttonsContainer}>
              {Object.entries(analysisData).map(([key, value]) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.diagnosisButton,
                    { backgroundColor: getColorFromValue(value as number) }
                  ]}
                  onPress={() => {}}
                >
                  <ThemedText style={styles.buttonLabel}>{key}</ThemedText>
                  <ThemedText style={styles.buttonValue}>
                    {((value as number) * 100).toFixed(1)}%
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.explanationCard}>
              <ThemedText style={styles.explanationTitle}>
                What does this mean?
              </ThemedText>
              <ThemedText style={styles.explanationText}>
                The buttons above show the probability of different diagnoses based on your tinnitus data.
                Darker blue indicates a higher probability.
              </ThemedText>
              <ThemedText style={styles.explanationText}>
                This is not a medical diagnosis. Please consult with a healthcare professional for proper evaluation.
              </ThemedText>
            </View>
          </View>
        )}
      </ScrollView>
      
      <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
        <ThemedText style={styles.buttonText}>Return Home</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#F44336',
    textAlign: 'center',
    marginVertical: 10,
  },
  retryButton: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  retryText: {
    fontWeight: '500',
  },
  analysisContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  diagnosisButton: {
    width: '48%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    minHeight: 100,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  explanationCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  explanationText: {
    fontSize: 14,
    marginBottom: 10,
  },
  finishButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#A1CEDC',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

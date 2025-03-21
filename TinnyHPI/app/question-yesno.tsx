import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function YesNoQuestionScreen() {
  const [answer, setAnswer] = useState<string | null>(null);
  
  const handleSave = () => {
    // Save the response (you could use AsyncStorage here)
    console.log('Yes/No answer saved:', answer);
    
    // Navigate to the results page
    router.push('/results');
  };
  
  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <ThemedText type="title" style={styles.questionTitle}>
          Did you experience any stressful events today?
        </ThemedText>
        
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.answerButton, answer === 'yes' && styles.selectedButton]}
            onPress={() => setAnswer('yes')}
          >
            <ThemedText style={styles.buttonText}>Yes</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.answerButton, answer === 'no' && styles.selectedButton]}
            onPress={() => setAnswer('no')}
          >
            <ThemedText style={styles.buttonText}>No</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[styles.saveButton, !answer && styles.disabledButton]}
        onPress={handleSave}
        disabled={!answer}
      >
        <ThemedText style={styles.saveButtonText}>Save & Continue</ThemedText>
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  answerButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  selectedButton: {
    backgroundColor: '#A1CEDC',
  },
  buttonText: {
    fontSize: 18,
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
  disabledButton: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D3D47',
  },
});

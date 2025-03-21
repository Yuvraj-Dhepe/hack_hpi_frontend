import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ResultsScreen() {
  const handleFinish = () => {
    // Return to home screen
    router.replace('/');
  };
  
  return (
    <ThemedView style={styles.container}>
      <View style={styles.iconContainer}>
        <IconSymbol name="checkmark.circle.fill" size={80} color="#4CAF50" />
      </View>
      
      <ThemedText type="title" style={styles.title}>
        Thank You!
      </ThemedText>
      
      <ThemedText style={styles.message}>
        Your responses have been recorded. This information helps us understand your tinnitus patterns better.
      </ThemedText>
      
      <ThemedText style={styles.tip}>
        Tip: Try to maintain a consistent sleep schedule to help manage tinnitus symptoms.
      </ThemedText>
      
      <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
        <ThemedText style={styles.buttonText}>Finish</ThemedText>
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
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.8,
  },
  tip: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    padding: 16,
    backgroundColor: '#E8F4F8',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#A1CEDC',
  },
  finishButton: {
    backgroundColor: '#A1CEDC',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D3D47',
  },
});

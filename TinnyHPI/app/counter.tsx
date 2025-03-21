import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function CounterScreen() {
  const [count, setCount] = useState(0);
  const colorScheme = useColorScheme();
  
  const incrementColor = '#4CAF50';
  const decrementColor = '#F44336';
  const textColor = colorScheme === 'dark' ? '#FFFFFF' : '#1D3D47';
  
  return (
    <>
      <Stack.Screen options={{ title: 'Counter', headerShown: true }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Counter
        </ThemedText>
        
        <ThemedView style={styles.counterContainer}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: decrementColor }]}
            onPress={() => setCount(count - 1)}
          >
            <Ionicons name="remove" size={24} color="white" />
          </TouchableOpacity>
          
          <ThemedView style={styles.countContainer}>
            <ThemedText style={styles.count}>{count}</ThemedText>
          </ThemedView>
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: incrementColor }]}
            onPress={() => setCount(count + 1)}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </ThemedView>
        
        <ThemedText style={styles.description}>
          Tap the buttons to increase or decrease the counter
        </ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 48,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  countContainer: {
    marginHorizontal: 24,
    width: 100,
    alignItems: 'center',
  },
  count: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
});
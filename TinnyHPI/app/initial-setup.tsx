import { useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function InitialSetupScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');

  const handleSubmit = async () => {
    // Save user info to AsyncStorage
    await AsyncStorage.setItem('userInfo', JSON.stringify({ name, age, sex }));
    await AsyncStorage.setItem('setupComplete', 'true');
    
    // Navigate to home
    router.replace('/');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Welcome to TinnyHPI
      </ThemedText>
      
      <ThemedText style={styles.subtitle}>
        Please provide your information to get started
      </ThemedText>
      
      <View style={styles.inputContainer}>
        <ThemedText style={styles.label}>Name</ThemedText>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <ThemedText style={styles.label}>Age</ThemedText>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Enter your age"
          keyboardType="numeric"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <ThemedText style={styles.label}>Sex</ThemedText>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.sexButton, sex === 'Male' && styles.selectedButton]}
            onPress={() => setSex('Male')}
          >
            <ThemedText style={styles.buttonText}>Male</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sexButton, sex === 'Female' && styles.selectedButton]}
            onPress={() => setSex('Female')}
          >
            <ThemedText style={styles.buttonText}>Female</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[styles.submitButton, (!name || !age || !sex) && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={!name || !age || !sex}
      >
        <ThemedText style={styles.submitButtonText}>Get Started</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sexButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#A1CEDC',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#A1CEDC',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D3D47',
  },
});
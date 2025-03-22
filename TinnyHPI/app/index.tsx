import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    // Check if initial setup is complete
    checkSetupStatus();
    // Load user info
    loadUserInfo();
  }, []);
  
  const checkSetupStatus = async () => {
    const setupComplete = await AsyncStorage.getItem('setupComplete');
    if (setupComplete !== 'true') {
      router.replace('/initial-setup');
    }
  };
  
  const loadUserInfo = async () => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        const { name } = JSON.parse(userInfo);
        setUserName(name);
      }
    } catch (error) {
      console.error('Failed to load user info:', error);
    }
  };
  
  const handleProceed = () => {
    router.push('/question-slider-first');
  };

  const resetUserData = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      await AsyncStorage.removeItem('setupComplete');
      router.replace('/initial-setup');
    } catch (error) {
      console.error('Failed to reset user data:', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.userIconContainer}>
        <IconSymbol name="house.fill" size={40} color="#A1CEDC" />
      </View>
      
      <ThemedText type="title" style={styles.welcomeText}>
        Welcome back, {userName}!
      </ThemedText>
      
      <ThemedText style={styles.subtitle}>
        Let's check in on your tinnitus today.
      </ThemedText>
      
      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <ThemedText style={styles.buttonText}>Proceed</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={resetUserData}>
        <ThemedText style={styles.resetButtonText}>Reset Data</ThemedText>
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
  userIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.8,
  },
  proceedButton: {
    backgroundColor: '#A1CEDC',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D3D47',
  },
  resetButton: {
    backgroundColor: '#E57373',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

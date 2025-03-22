import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNav from './BottomNav';
import { styles, COLORS } from './styles';

export default function HomeScreen() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { name } = JSON.parse(userData);
          setUserName(name);
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    getUserData();
  }, []);

  const handleResetData = async () => {
    console.log("Reset button pressed");
    try {
      // Directly clear AsyncStorage items
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('questionResponses');
      await AsyncStorage.removeItem('userInfo');
      await AsyncStorage.removeItem('setupComplete');
      
      console.log("User data reset successfully");
      // Navigate back to start screen
      router.replace('/start');
    } catch (error) {
      console.error('Failed to reset user data:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Hello <b>{userName || 'User'}</b>!</Text>
        <Text style={styles.text}>Welcome to ToneDown!</Text>
        
        <Link href="/tinnitus_question">
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Intervention</Text>
          </TouchableOpacity>
        </Link>
        
        <Link href="/interventions">
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Learn about interventions</Text>
          </TouchableOpacity>
        </Link>
        
        {/* Reset Data button */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: COLORS.red }]} 
          onPress={handleResetData}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Reset Data</Text>
        </TouchableOpacity>
      </View>
      <BottomNav />
    </View>
  );
}

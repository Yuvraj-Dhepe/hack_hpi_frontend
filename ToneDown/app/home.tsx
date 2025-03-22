import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
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

  const resetUserData = async () => {
    console.log("Resetting user data"); // Debug log
    try {
      // Clear all user data
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('questionResponses');
      await AsyncStorage.removeItem('userInfo');
      await AsyncStorage.removeItem('setupComplete');
      
      console.log("Data cleared, navigating to start"); // Debug log
      // Force navigation to start page
      router.replace('/start');
    } catch (error) {
      console.error('Failed to reset user data:', error);
    }
  };

  const handleReset = () => {
    console.log("Reset button clicked"); // Debug log
    
    // Check if we're on web platform
    if (Platform.OS === 'web') {
      // For web, use window.confirm instead of Alert
      if (window.confirm("Are you sure you want to reset your user data? This will delete all your information.")) {
        resetUserData();
      }
    } else {
      // For native platforms, use Alert
      Alert.alert(
        "Reset User Data",
        "Are you sure you want to reset your user data? This will delete all your information.",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "Reset", 
            onPress: resetUserData,
            style: "destructive"
          }
        ]
      );
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
            <Text style={styles.buttonText}>Learn about how interventions work</Text>
          </TouchableOpacity>
        </Link>
        
        {/* Reset button - Direct onPress handler */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: COLORS.red, marginTop: 20 }]} 
          onPress={handleReset}
        >
          <Text style={styles.buttonText}>Reset User Data</Text>
        </TouchableOpacity>
      </View>
      <BottomNav />
    </View>
  );
}

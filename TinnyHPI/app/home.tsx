import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNav from './BottomNav';
import { styles } from './styles';

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
      </View>
      <BottomNav />
    </View>
  );
}

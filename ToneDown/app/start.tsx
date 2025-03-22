import { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styles, COLORS } from './styles';
import { Image } from 'react-native';
import BottomNav from './BottomNav';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Start() {
  const router = useRouter();

  useEffect(() => {
    // Check if user data exists on component mount
    const checkUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          // User data exists, go to home page
          router.replace('/home');
        }
      } catch (error) {
        console.error('Error checking user data:', error);
      }
    };
    
    checkUserData();
  }, []);

  const handleContinue = () => {
    console.log("Continue button pressed");
    // Navigate to user information page to collect data
    router.push('/user_information');
  };

  return (
    <View style={{height: '100%'}}>
      <ThemedView style={localstyle.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>
              Welcome to
          </ThemedText>
          <ThemedText type="title" style={styles.titleBold}>
              ToneDown
          </ThemedText>
        </ThemedView>
        <ThemedText type="default" style={styles.text} >
            This app will help with you tinnitus by proposing interventions. 
            Just open the app when you experinece difficulties with tinnitus. 
            We then choose the best intervention based on your needs.
            Over time, the app will learn how to best help you.
            You can find the possible interventions below and remove and that you do not want.
        </ThemedText>
        
        <TouchableOpacity 
          style={[styles.button, localstyle.continueButton]} 
          onPress={handleContinue}
          activeOpacity={0.7}
        >
          <ThemedText style={styles.buttonText}>Continue</ThemedText>
        </TouchableOpacity>
        
        <Image 
          source={require('../assets/images/Mindfulness-cuate.svg')} 
          style={{ width: 250, height: 250, alignSelf: 'center', marginTop: 20 }} 
        />
      </ThemedView>
      <BottomNav />
    </View>
  );
}

const localstyle = StyleSheet.create({
  container: {
    marginTop: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  continueButton: {
    marginTop: 20,
    marginBottom: 10,
    width: '80%',
    alignSelf: 'center'
  }
});

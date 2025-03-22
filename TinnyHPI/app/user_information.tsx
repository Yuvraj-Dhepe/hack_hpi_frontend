import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, router } from 'expo-router';
import { styles, COLORS } from './styles';
import BottomNav from './BottomNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Question from './utility';

export default function UserInformation() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');

  const saveUserData = async () => {
    try {
      const userData = {
        name,
        age,
        sex
      };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      router.push('/home');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <View style={{height: '100%'}}>
      <ThemedView style={localStyle.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
            Please Enter your
        </ThemedText>
        <ThemedText type="title" style={styles.titleBold}>
            Information
        </ThemedText>
        </ThemedView>
      
      <Question title="What is your name?" value={name} setValue={setName} inputType="text"/>
      <Question title="How old are you?" value={age} setValue={setAge} inputType="number"/>
      <Question title="What is your sex?" value={sex} setValue={setSex} inputType="button" options={["m","f","d"]}/>

      <View style={{ flex: 1, justifyContent: 'start', alignItems: 'center' }}>
        <TouchableOpacity style={styles.button} onPress={saveUserData}>
          <ThemedText style={styles.buttonText}>Submit</ThemedText>
        </TouchableOpacity>
      </View>
      </ThemedView>
        <BottomNav />
      </View>
  );
}

const localStyle = StyleSheet.create({
  container: {
    marginTop: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
    height: '76%',
  }
});

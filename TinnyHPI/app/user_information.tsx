import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styled } from 'nativewind';
import { Link } from 'expo-router';

import Question from './utility';

// get user input like name, age, sex, etc. to set up the user's profile

export default function UserInformation() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');

    return (
        <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
            User Information
        </ThemedText>
        
        <Question title="What is your name?" value={name} setValue={setName} inputType="text"/>
        <Question title="How old are you?" value={age} setValue={setAge} inputType="number"/>
        <Question title="What is your sex?" value={sex} setValue={setSex} inputType="button"/>

        <Link href="/">
                <TouchableOpacity style={styles.button}>
                  <ThemedText style={styles.buttonText}>Submit</ThemedText>
                </TouchableOpacity>
        </Link>
        </ThemedView>
        
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#F8F9FA',
    },
    title: {
      fontSize: 28,
      marginBottom: 16,
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#1D3D47',
    },
    questionContainer: {
      width: '100%',
      marginBottom: 20,
      alignItems: 'center',
    },
    questionText: {
      fontSize: 18,
      marginBottom: 8,
      textAlign: 'center',
      color: '#4A4A4A',
    },
    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    optionButton: {
      backgroundColor: '#E0E0E0',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginHorizontal: 5,
    },
    optionButtonSelected: {
      backgroundColor: '#A1CEDC',
    },
    optionButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#1D3D47',
    },
    button: {
      backgroundColor: '#A1CEDC',
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginTop: 20,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1D3D47',
    },
  });

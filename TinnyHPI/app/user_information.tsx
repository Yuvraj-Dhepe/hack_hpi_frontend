import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styled } from 'nativewind';
import { Link } from 'expo-router';
import { styles, COLORS } from './styles';

import Question from './utility';

// get user input like name, age, sex, etc. to set up the user's profile

export default function UserInformation() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');

    return (
        <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
            Please Enter your
        </ThemedText>
        <ThemedText type="title" style={styles.titleBold}>
            Information
        </ThemedText>
        
        <Question title="What is your name?" value={name} setValue={setName} inputType="text"/>
        <Question title="How old are you?" value={age} setValue={setAge} inputType="number"/>
        <Question title="What is your sex?" value={sex} setValue={setSex} inputType="button" options={["m","f","d"]}/>

        <Link href="/home">
                <TouchableOpacity style={styles.button}>
                  <ThemedText style={styles.buttonText}>Submit</ThemedText>
                </TouchableOpacity>
        </Link>
        </ThemedView>
        
    );
}

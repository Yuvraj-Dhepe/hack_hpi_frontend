import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styled } from 'nativewind';
import { Link } from 'expo-router';

import Question from './utility';

// create a view that asks for feedback on the one intervention that the user chose
// we want a slider on how helpful it was

export default function Feedback() {
  const [feedback, setFeedback] = useState(null);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Feedback
      </ThemedText>
      
      <Question title="How helpful was the intervention?" value={feedback} setValue={setFeedback} inputType="slider" />
      
      <Link href="/home">
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
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
    });
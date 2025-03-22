import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styled } from 'nativewind';
import { Link } from 'expo-router';
import { styles, COLORS } from './styles';
import BottomNav from './BottomNav'; // Import BottomNav

import Question from './utility';

// create a view that asks for feedback on the one intervention that the user chose
// we want a slider on how helpful it was

export default function Feedback() {
  const [feedback, setFeedback] = useState(null);

  return (
    <ThemedView style={localStyle.container}>
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
      <BottomNav /> {/* Include BottomNav */}    
    </ThemedView>
  );
}

const localStyle = StyleSheet.create({
  container: {
    height: '100%',
  }
});
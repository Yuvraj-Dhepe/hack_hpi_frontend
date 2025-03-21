import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styled } from 'nativewind';
import { Link } from 'expo-router';
//import { Bedtime } from '@mui/icons-material';
import Question from './utility'; // Assuming this is your input component
import { styles, COLORS } from './styles';

const questionConfig = {
  bedtime: {
    icon: "tmp",//<Bedtime />,
    title: "Bedtime Question",
    question: "What time did you go to bed?",
    inputType: "text"
  },
  tinnitus: {
    icon: "tmp",//<BedTimeIcon />, // Replace with the actual tinnitus icon
    title: "Tinnitus Severity",
    question: "How bad is the tinnitus?",
    inputType: "slider" // Assuming you have a slider component
  }
  // Add more questions as needed
};

export default function IndividualQuestion({ id }) {
  const [questionValue, setQuestionValue] = useState(null);
  const { icon, title, question, inputType } = questionConfig[id] || {};

  return (
    <ThemedView style={styles.container}>
      {icon}
      <ThemedText type="title" style={styles.title}>
        {title}
      </ThemedText>

      <Question title={question} value={questionValue} setValue={setQuestionValue} inputType={inputType} />

      <Link href="/">
        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText}>ARROW RIGHT</ThemedText>
        </TouchableOpacity>
      </Link>
    </ThemedView>
  );
}
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styled } from 'nativewind';
import { Link } from 'expo-router';
import BedTimeIcon from '@mui/icons-material/BedTime'; // Ensure to import the icon correctly
import Question from './utility'; // Assuming this is your input component

const questionConfig = {
  bedtime: {
    icon: "tmp",//<BedTimeIcon />,
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
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1EB1FC',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

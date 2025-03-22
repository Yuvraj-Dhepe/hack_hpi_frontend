import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles as globalStyles, COLORS } from './styles';

interface QuestionProps {
  title: string;
  value: string | number;
  setValue: (value: any) => void;
  inputType: 'text' | 'number' | 'button' | 'slider';
  options: string[];
}

export default function Question({ title, value, setValue, inputType, options }: QuestionProps) {
  const renderInput = () => {
    switch (inputType) {
      case 'text':
        return (
          <TextInput
            style={styles.input}
            value={value as string}
            onChangeText={setValue}
          />
        );
      case 'number':
        return (
          <TextInput
            style={styles.input}
            value={value as string}
            onChangeText={setValue}
            keyboardType="numeric"
          />
        );
      case 'button':
        return (
          <View style={styles.buttonContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  value === option && styles.selectedButton
                ]}
                onPress={() => setValue(option)}
              >
                <ThemedText style={styles.optionText}>{option}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.questionContainer}>
      <ThemedText style={styles.questionTitle}>{title}</ThemedText>
      {renderInput()}
    </View>
  );
}

const styles = StyleSheet.create({
  questionContainer: {
    width: '100%',
    marginBottom: 20,
  },
  questionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    backgroundColor: COLORS.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  optionButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLORS.lightGray,
    minWidth: 60,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: COLORS.primary,
  },
  optionText: {
    color: COLORS.text,
  }
});

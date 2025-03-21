import  Slider from '@mui/material/Slider';
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles, COLORS } from './styles';

const levels = ["Low", "Moderate", "High"];
const gender = ["m", "f", "d"];

export default function Question({ title, value, setValue, inputType, options }) {
    const renderInput = () => {
      switch (inputType) {
        case 'text':
          return (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={setValue}
            />
          );
        case 'number':
          return (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={setValue}
            />
          );
        case 'slider':
          return (
            <Slider
              aria-label="Temperature"
              defaultValue={30}
              getAriaValueText={value}
              valueLabelDisplay="auto"
              step={10}
              marks
              min={10}
              max={110}
            />
          );
        case 'buttonsWider':
            if (options == null) {
                options = levels;
            }
          return (
            <View style={styles.buttonGroupWide}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButtonWide,
                    value === option && styles.optionButtonSelected,
                  ]}
                  onPress={() => setValue(option)}
                >
                  <ThemedText style={styles.optionButtonText}>{option}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          );
        
        case 'buttons':
            if (options == null) {
                options = levels;
            }
        default:
          return (
            <View style={styles.buttonGroup}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    value === option && styles.optionButtonSelected,
                  ]}
                  onPress={() => setValue(option)}
                >
                  <ThemedText style={styles.optionButtonText}>{option}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          );
      }
    };
  
    return (
      <View style={styles.questionContainer}>
        <ThemedText style={styles.questionText}>{title}</ThemedText>
        {renderInput()}
      </View>
    );
  }
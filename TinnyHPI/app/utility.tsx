import  Slider from '@mui/material/Slider';
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

const levels = ["Low", "Moderate", "High"];
const gender = ["m", "f", "d"];

export default function Question({ title, value, setValue, inputType }) {
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
          shiftStep={30}
          step={10}
          marks
          min={10}
          max={110}
        />
        );
      case 'buttons':
      default:
        return (
          <View style={styles.buttonGroup}>
            {levels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.optionButton,
                  value === level && styles.optionButtonSelected,
                ]}
                onPress={() => setValue(level)}
              >
                <ThemedText style={styles.optionButtonText}>{level}</ThemedText>
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

const styles = StyleSheet.create({
    input: {
        width: '100%',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#e0e0e0',
        marginBottom: 10,
        },
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    questionContainer: {
      marginBottom: 20,
    },
    questionText: {
      fontSize: 18,
      marginBottom: 10,
    },
    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    optionButton: {
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#e0e0e0',
      flex: 1,
      marginHorizontal: 5,
    },
    optionButtonSelected: {
      backgroundColor: '#1EB1FC',
    },
    optionButtonText: {
      textAlign: 'center',
      color: '#000',
    },
    slider: {
      width: '100%',
      height: 40,
      marginTop: 10,
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
  
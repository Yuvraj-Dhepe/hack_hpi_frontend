import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { styles as globalStyles, COLORS } from './styles';
import Question from './utility';
import BottomNav from './BottomNav'; // Import BottomNav


export default function IntoxicationQuestion() {
  const [selectedIntoxication, setSelectedIntoxication] = useState(null);
  const intoxicationOptions = ["Alcohol", "Drugs", "Smoke", "Am Clean"];

  return (
    <View style={{height: '100%'}}>
    <ThemedView style={[globalStyles.container, styles.centeredContainer]}>
      <View style={styles.cardContainer}>
        <View style={styles.circleIconContainer}>
          <ThemedText style={styles.icon}>🍷</ThemedText>
        </View>
        
        <View style={styles.cardContent}>
          <ThemedText type="title" style={styles.title}>
            Substance Use
          </ThemedText>
          
          <ThemedText style={styles.question}>
            Are you intoxicated?
          </ThemedText>
          
          <Question 
            title="" 
            value={selectedIntoxication} 
            setValue={setSelectedIntoxication} 
            inputType="buttonsWider" 
            options={intoxicationOptions}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/location_question">
          <TouchableOpacity 
            style={[globalStyles.button, styles.button, !selectedIntoxication && styles.buttonDisabled]}
            disabled={!selectedIntoxication}
          >
            <ThemedText style={globalStyles.buttonText}>Continue</ThemedText>
          </TouchableOpacity>
        </Link>
      </View>
    </ThemedView>
    <BottomNav /> {/* Include BottomNav */}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardContainer: {
    backgroundColor: COLORS.offwhite,
    borderRadius: 16,
    width: '90%',
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    marginTop: 40,
  },
  circleIconContainer: {
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.beige,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
  icon: {
    fontSize: 40,
  },
  cardContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    minWidth: 200,
    backgroundColor: COLORS.beige,
  },
  buttonDisabled: {
    opacity: 0.5,
  }
});
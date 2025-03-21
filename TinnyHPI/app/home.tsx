import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Sara!</Text>
      <Text>Welcome to ToneDown!</Text>
      <Link href="/questionaire">
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Intervention</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/interventions">
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Learn about how interventions work</Text>
        </TouchableOpacity>
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#1EB1FC',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});
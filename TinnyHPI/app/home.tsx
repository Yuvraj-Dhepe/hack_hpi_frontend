import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { styles, COLORS } from './styles';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello <b>Sara</b>!</Text>
      <Text style={styles.text}>Welcome to ToneDown!</Text>
      <Link href="/tinnitus_question">
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

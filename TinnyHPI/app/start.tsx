import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export default function Start() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
            Welcome to AppName!
        </ThemedText>
        <ThemedText type="default" >
            This app will help with you tinnitus by proposing interventions. 
            Just open the app when you experinece difficulties with tinnitus. 
            We then choose the best intervention based on your needs.
            Over time, the app will learn how to best help you.
            You can find the possible interventions below and remove and that you do not want.
        </ThemedText>


        <Link href="/user_information">
            <TouchableOpacity style={styles.button}>
                 <ThemedText style={styles.buttonText}>Contine</ThemedText>
            </TouchableOpacity>
        </Link>
    </ThemedView>
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
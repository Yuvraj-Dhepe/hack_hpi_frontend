import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function Greeting() {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Welcome Back, Sara!
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Let's check in on your tinnitus today.
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.8,
  },
});

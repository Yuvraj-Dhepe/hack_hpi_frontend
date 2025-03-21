import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles, COLORS } from './styles';

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

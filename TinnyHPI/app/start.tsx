import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { styles, COLORS } from './styles';
import { Image } from 'react-native';
import BottomNav from './BottomNav'; // Import BottomNav


export default function Start() {
  const router = useRouter();

  return (
    <View style={{height: '100%'}}>
    <ThemedView style={localstyle.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
            Welcome to
        </ThemedText>
        <ThemedText type="title" style={styles.titleBold}>
            ToneDown
        </ThemedText>
        </ThemedView>
        <ThemedText type="default" style={styles.text} >
            This app will help with you tinnitus by proposing interventions. 
            Just open the app when you experinece difficulties with tinnitus. 
            We then choose the best intervention based on your needs.
            Over time, the app will learn how to best help you.
            You can find the possible interventions below and remove and that you do not want.
        </ThemedText>
        <View style={{ flex: 1, justifyContent: 'start', alignItems: 'center' }}>
        <Link href="/user_information">
            <TouchableOpacity style={styles.button}>
                 <ThemedText style={styles.buttonText}>Continue</ThemedText>
            </TouchableOpacity>
        </Link>
        </View>
        <Image 
          source={require('../assets/images/Mindfulness-cuate.svg')} 
          style={{ width: 250, height: 250, alignSelf: 'center', marginTop:-10 }} 
        />    </ThemedView>
              <BottomNav /> {/* Include BottomNav */}
        </View>
  );
}

const localstyle = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  }
});
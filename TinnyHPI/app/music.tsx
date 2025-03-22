import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { styles, COLORS } from './styles';
import { Image } from 'react-native';
import BottomNav from './BottomNav'; // Import BottomNav


export default function MusicScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Listen to music to <b>relax</b></Text>
        <Text style={{textAlign: 'center'}}>Music can be 
        a great way to relax and reduce stress. Find out what works best for you!
        </Text>
        <Image source={require('../assets/images/Music-cuate.svg')} 
          style={{ width: 250, height: 250, alignSelf: 'center', marginTop:-10 }}
        />
      </View>
      <BottomNav /> {/* Include BottomNav */}
    </View>
  );
}
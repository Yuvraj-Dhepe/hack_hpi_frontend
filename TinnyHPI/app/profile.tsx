import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { styles, COLORS } from './styles';
import { Image } from 'react-native';
import BottomNav from './BottomNav'; // Import BottomNav

export default function Profile(){

    return (
        <View style={{height: '100%'}}>
            <ThemedView style={styles.container}>
                <ThemedText type="title" style={styles.title}><b>Profile</b></ThemedText>
                <ThemedText style={styles.text}>Welcome to your profile page</ThemedText>
                <View>
                <Image
            style={{ width: 250, height: 250, alignSelf: 'center', marginTop:-10, marginBottom: 20 }} 
            source={require('../assets/images/Powerful-amico.svg')} 
                    />
                <View style={styles.profileDetails}>
                    <ThemedText style={styles.text}><b>Name:</b> Sara</ThemedText>
                    <ThemedText style={styles.text}><b>Age:</b> 25</ThemedText>
                </View>
                </View>
            </ThemedView>
            <View style={{height: 65}}>
            <BottomNav /> {/* Include BottomNav */}
            </View>
        </View>
    );
}

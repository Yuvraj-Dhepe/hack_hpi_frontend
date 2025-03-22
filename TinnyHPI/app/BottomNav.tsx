import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from './styles';


export default function BottomNav() {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
        <Feather name="home" size={24} color="#000" />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.mainNavButton} onPress={() => navigation.navigate('Explore')}>
        <Feather name="grid" size={24} color="#fff" />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
        <Feather name="user" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navButton: {
    padding: 10,
  },
  mainNavButton: {
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 30,
  },
});
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import Slider from '@react-native-community/slider';
import { styles as globalStyles, COLORS } from './styles';
import BottomNav from './BottomNav';

export default function Feedback() {
  const [sliderValue, setSliderValue] = useState(3);
  const [isHovering, setIsHovering] = useState(false);

  const renderSliderLabels = () => {
    return (
      <View style={styles.sliderLabelsContainer}>
        <ThemedText style={styles.sliderLabel}>Not Helpful</ThemedText>
        <ThemedText style={styles.sliderLabel}>Very Helpful</ThemedText>
      </View>
    );
  };

  return (
    <ThemedView style={localStyle.container}>
      <ThemedView style={[globalStyles.container, styles.centeredContainer]}>
        <View style={styles.cardContainer}>
          <View style={styles.circleIconContainer}>
            <ThemedText style={styles.icon}>📝</ThemedText>
          </View>
          
          <View style={styles.cardContent}>
            <ThemedText type="title" style={styles.title}>
              Feedback
            </ThemedText>
            
            <ThemedText style={styles.question}>
              How helpful was the intervention?
            </ThemedText>
            
            <View style={styles.sliderContainer}>
              <View style={styles.sliderWithValueContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={1}
                  maximumValue={5}
                  step={0.1}
                  value={sliderValue}
                  onValueChange={(value) => {
                    setSliderValue(value);
                    setIsHovering(true);
                  }}
                  onSlidingComplete={() => {
                    setTimeout(() => setIsHovering(false), 1500);
                  }}
                  minimumTrackTintColor="#3498db"
                  maximumTrackTintColor="#bdc3c7"
                  thumbTintColor="#2980b9"
                />
                {isHovering && (
                  <View 
                    style={[
                      styles.hoverValueContainer, 
                      { left: `${((sliderValue - 1) / 4) * 100}%` }
                    ]}
                  >
                    <ThemedText style={styles.hoverValue}>{sliderValue.toFixed(1)}</ThemedText>
                  </View>
                )}
              </View>
              {renderSliderLabels()}
              <ThemedText style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginTop: 10,
                color: '#2980b9'
              }}>
                {sliderValue.toFixed(1)}
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Link href="/home">
            <TouchableOpacity style={[globalStyles.button, styles.button]}>
              <ThemedText style={globalStyles.buttonText}>Submit</ThemedText>
            </TouchableOpacity>
          </Link>
        </View>
      </ThemedView>
      <BottomNav />
    </ThemedView>
  );
}

const localStyle = StyleSheet.create({
  container: {
    height: '100%',
  }
});
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
    marginBottom: 30,
    textAlign: 'center',
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
  },
  sliderWithValueContainer: {
    width: '100%',
    position: 'relative',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  hoverValueContainer: {
    position: 'absolute',
    top: -30,
    backgroundColor: '#2980b9',
    padding: 5,
    borderRadius: 5,
    transform: [{ translateX: -15 }],
  },
  hoverValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sliderLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: -10,
  },
  sliderLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    minWidth: 200,
    backgroundColor: COLORS.beige,
  }
});

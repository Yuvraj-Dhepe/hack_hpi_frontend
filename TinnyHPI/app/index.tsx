import { StyleSheet, ScrollView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
import Greeting from './Greetings';
import UserInformation from './user_information';
import QuestionnaireScreen from './questionaire';
import Feedback from './feedback';


export default function HomeScreen() {
  return (
      <ScrollView contentContainerStyle={styles.container}>
        <Greeting />
        <Feedback/>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  opacity: {
    opacity: 0,
  }
});

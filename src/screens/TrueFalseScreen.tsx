import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import {} from '../components/Timer'
const imageBackground = require('../assets/images/background.png');
const closeIcon = require('../assets/icons/close.png');
// const data = require('../data/software-true-false.json');
// console.log(data)

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type RootStackParamList = {
  TrueFalse: undefined;
  Finish: undefined;
};

type TrueFalseScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TrueFalse'
>;

export function TrueFalseScreen() {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean>();

  const navigation = useNavigation<TrueFalseScreenNavigationProp>();

  const goToFinish = () => {
    navigation.navigate('Finish');
  };
  useEffect(() => {
    // This effect will run every time `selectedAnswer` changes
    console.log(selectedAnswer);
    // You can perform additional actions here based on the selected answer
  }, [selectedAnswer]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#6A5AE0'} barStyle="light-content" />
      <ImageBackground source={imageBackground} style={styles.imageBackground}>
        <View style={styles.headerContainer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>Sport</Text>
            <TouchableOpacity onPress={goToFinish}>
              <Image source={closeIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.timerQuestionContainer}>
            <Text style={styles.timerText}>1/10</Text>
            <Text style={styles.timerText}>00:17</Text>
          </View>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            "Which Pokémon and its evolutions were banned from appearing in a main role after the Episode 38 Incident?"
          </Text>
        </View>
        <View style={styles.answerContainer}>
          <TouchableOpacity
            style={
              styles.answerButtonTrue
            }
            onPress={() => setSelectedAnswer(true)}
          >
            <Text style={styles.answerButtonText}>True</Text>
          </TouchableOpacity>
          <TouchableOpacity
             style={
                styles.answerButtonFalse
              }
              onPress={() => setSelectedAnswer(false)}
          >
            <Text style={styles.answerButtonText}>False</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    backgroundColor: '#6A5AE0',
    width: windowWidth,
    height: windowHeight,
    resizeMode: 'cover',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContainer: {
    paddingTop: 20,
    width: 340,
    gap: 18,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: 'Rubik',
    fontSize: 24,
    fontWeight: '500',
    color: '#fff',
  },
  timerQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timerText: {
    fontFamily: 'Rubik',
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  questionContainer: {
    width: 340,
  },
  questionText: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'left',
    color: '#fff',
  },
  answerContainer: {
    width: 340,
    flexDirection:'row',
    paddingBottom:35,
    justifyContent:'space-between',
  },
  answerButtonFalse: {
    borderRadius: 8,
    paddingVertical:18,
    paddingHorizontal: 60,
    marginBottom: 12,
    backgroundColor: '#FD3654',

  },
  answerButtonTrue: {
  
    borderRadius: 8,
    paddingVertical:18,
    paddingHorizontal: 62,
    marginBottom: 12,
    backgroundColor: '#31B057',


  },
 
  answerButtonText: {
    fontFamily: 'Poppins',
    fontSize: 19,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});

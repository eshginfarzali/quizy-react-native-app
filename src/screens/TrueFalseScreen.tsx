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
import { useDispatch, useSelector } from 'react-redux';
import { incrementCorrectAnswers, resetCorrectAnswers } from '../redux/features/counterSlice';
import { RootState } from '../redux/store';
import { Timer } from '../components/Timer';
import { selectCategory } from '../redux/features/categorySlice';

const imageBackground = require('../assets/images/background.png');
const closeIcon = require('../assets/icons/close.png');

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

import sportQuestions from '../data/Sport-true-false.json'
import softwareQuestions from '../data/Software-true-false.json'


export function TrueFalseScreen() {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | undefined>();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [stop, setStop] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [category, setCategory] = useState('');
  const navigation = useNavigation<TrueFalseScreenNavigationProp>();
  const selectedCategory = useSelector(selectCategory);

  const dispatch = useDispatch();
  const correctAnswersCount = useSelector((state: RootState) => state.correctAnswers.count);

  useEffect(() => {
    dispatch(resetCorrectAnswers());
    if (selectedCategory === 'Sport') {
      setQuestions(sportQuestions);
      setCategory('Sport');
    } else if (selectedCategory === 'Software') {
      setQuestions(softwareQuestions);
      setCategory('Software');
    }
    setQuestionIndex(0);
  }, [selectedCategory]);

  const goToFinish = () => {
    navigation.navigate('Finish');
  };

  useEffect(() => {
    if (selectedAnswer !== undefined) {
      const correctAnswer = questions[questionIndex].answer;

      if (selectedAnswer === correctAnswer) {
        if (questionIndex + 1 < questions.length) {
          setSelectedAnswer(undefined);
          setQuestionIndex(questionIndex + 1);
          dispatch(incrementCorrectAnswers());
          setStop(false);
        } else {
          navigation.navigate('Finish');
        }
      } else {
        navigation.navigate('Finish');
      }
    }
  }, [selectedAnswer, questionIndex, questions, navigation, dispatch]);

  useEffect(() => {
    if (stop) {
      navigation.navigate('Finish');
    }
  }, [stop, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#6A5AE0'} barStyle="light-content" />
      <ImageBackground source={imageBackground} style={styles.imageBackground}>
        <View style={styles.headerContainer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{category}</Text>
            <TouchableOpacity onPress={goToFinish}>
              <Image source={closeIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.timerQuestionContainer}>
            <Text style={styles.timerText}>{`${questionIndex + 1}/${questions.length}`}</Text>
            <Timer setStop={setStop} questionNumber={questionIndex + 1} />
          </View>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {questions[questionIndex]?.question}
          </Text>
        </View>
        <View style={styles.answerContainer}>
          <TouchableOpacity
            style={styles.answerButtonTrue}
            onPress={() => {
              setSelectedAnswer(true);
            }}
          >
            <Text style={styles.answerButtonText}>True</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.answerButtonFalse}
            onPress={() => {
              setSelectedAnswer(false);
            }}
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
    flexDirection: 'row',
    paddingBottom: 35,
    justifyContent: 'space-between',
  },
  answerButtonFalse: {
    borderRadius: 8,
    paddingVertical: 18,
    paddingHorizontal: 60,
    marginBottom: 12,
    backgroundColor: '#FD3654',
  },
  answerButtonTrue: {
    borderRadius: 8,
    paddingVertical: 18,
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


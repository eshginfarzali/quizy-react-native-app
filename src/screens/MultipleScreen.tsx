import React, { useState } from 'react'
import { Dimensions, StatusBar, StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';


const imageBackground = require('../assets/images/background.png');
const closeIcon = require('../assets/icons/close.png');
// const category= 'sport';
// const data = require(`../data/sport.json`);
// console.log(data)
// // Assuming 'data' is the array of questions and answers you've logged
// data.forEach((question: { question: any; answers: any[]; }) => {
//     console.log(`Question: ${question.question}`);
//     question.answers.forEach((answer: { text: any; correct: any; }, index: number) => {
//       console.log(`Answer ${index + 1}: ${answer.text} (Correct: ${answer.correct})`);
//     });
//   });
   

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type RootStackParamList = {
    TrueFalse: undefined;
    Finish: undefined;


};
type TrueFalseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TrueFalse'>;


export function MultipleScreen() {
    const [selectedAnswer, setSelectedAnswer] = useState<boolean>();
    const navigation = useNavigation<TrueFalseScreenNavigationProp>();

    const goToFinish = () => {
        navigation.navigate('Finish')
    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <StatusBar backgroundColor={'#6A5AE0'} 
                barStyle='light-content'
                />
                <ImageBackground
                    source={imageBackground}
                    style={styles.imageBackground}
                >

                    <View style={styles.headerContainer}>
                        <View style={styles.categoryContainer}>
                            <Text style={styles.categoryText}>Sport</Text>
                            <TouchableOpacity
                                onPress={goToFinish}
                            >
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
                        "Which Pok&eacute;mon and it&#039;s evolutions were banned from appearing in a main role after the Episode 38 Incident?"

                        </Text>
                    </View>


                    <View style={styles.answerContainer}>
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
                styles.answerButton
              }
              onPress={() => setSelectedAnswer(false)}
          >
            <Text style={styles.answerButtonText}>False</Text>
          </TouchableOpacity>
          <TouchableOpacity
             style={
                styles.answerButton
              }
              onPress={() => setSelectedAnswer(false)}
          >
            <Text style={styles.answerButtonText}>False</Text>
          </TouchableOpacity>
          <TouchableOpacity
             style={
                styles.answerButton
              }
              onPress={() => setSelectedAnswer(false)}
          >
            <Text style={styles.answerButtonText}>False</Text>
          </TouchableOpacity>
        </View>

                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    imageBackground: {
        backgroundColor: "#6A5AE0",
        width: windowWidth,
        height: windowHeight,
        resizeMode: 'cover',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerContainer: {
        paddingTop: 20,
        width: 340,
        gap:18,
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
    timerQuestionContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timerText:{
        fontFamily: 'Rubik',
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },

    questionContainer: {
        width: 340,
    },
    questionText:{
        fontFamily: 'Poppins',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        textAlign: 'left',
        color:'#fff',
        
    },


    answerContainer: {
        width: 340,
        flexDirection:'column',
        paddingBottom:35,
        justifyContent:'space-between',
      },
      answerButton: {
        borderRadius: 8,
        paddingVertical:18,
        paddingHorizontal: 60,
        marginBottom: 12,
        backgroundColor: '#C4D0FB',

    
      },
      answerButtonTrue: { 
        borderRadius: 8,
        paddingVertical:18,
        paddingHorizontal: 62,
        marginBottom: 12,
        backgroundColor: '#31B057',
      },
      answerButtonFalse: { 
        borderRadius: 8,
        paddingVertical:18,
        paddingHorizontal: 62,
        marginBottom: 12,
        backgroundColor: '#FD3654',
      },

     
     
      answerButtonText: {
        fontFamily: 'Poppins',
        fontSize: 19,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
      },
})
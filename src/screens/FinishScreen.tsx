import React, { useState } from 'react'
import { Dimensions, StatusBar, StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { selectCategory } from '../redux/features/categorySlice';
import { RootState } from '../redux/store';
const imageBackground = require('../assets/images/background.png');
const closeIcon = require('../assets/icons/close.png');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type RootStackParamList = {
    Finish: undefined;
    Home: undefined;


};
type TrueFalseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Finish'>;


export function FinishScreen() {
    // const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory);
    const correctAnswersCount = useSelector((state: RootState) => state.correctAnswers.count);

    const score = correctAnswersCount * 10; // Doğru cevap sayısını skora çevirme

    const selectedCategory = useSelector(selectCategory);
    const navigation = useNavigation<TrueFalseScreenNavigationProp>();

    const goToFinish = () => {
        navigation.navigate('Home')
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
                            <Text style={styles.categoryText}>
                                <Text style={styles.categoryText}>{selectedCategory}</Text>
                            </Text>
                            <TouchableOpacity
                                onPress={goToFinish}
                            >
                                <Image source={closeIcon} />
                            </TouchableOpacity>
                        </View>


                    </View>



                    <View style={styles.resultContainer}>
                        <Text style={styles.resultText}>
                            Correct: {correctAnswersCount}
                        </Text>
                        <Text style={styles.resultText}>
                            Score: {score}
                        </Text>
                    </View>


                    <View style={styles.answerContainer}></View>
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


    resultContainer: {

        gap: 10,
    },
    resultText: {
        fontFamily: 'Poppins',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 24,
        textAlign: 'left',
        color: '#fff',

    },



    answerContainer: {

    },
})
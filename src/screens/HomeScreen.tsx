import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, ImageBackground, StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import SelectDropdown from 'react-native-select-dropdown';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const imageBackground = require('../assets/images/background.png');
const starIcon = require('../assets/icons/star.png');
const dropdownIcon = require('../assets/icons/dropdown.png');
const arrowWImage = require('../assets/icons/arrowWhite.png');


type RootStackParamList = {
    Home: undefined;
    Ranking: undefined;
    Options: undefined;
};
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type FormData = {
    category: string;
    difficulty: string;
    type: string;
};

export const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const { control, handleSubmit } = useForm<FormData>();
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedOptions, setSelectedOptions] = useState<FormData>({
        category: 'Sport',
        difficulty: 'low',
        type: 'TrueFalse',
    });

    const goToRanking = () => {
        navigation.navigate('Ranking');
    };



    const handleDifficultySelection = (difficulty: string) => {
        setSelectedDifficulty(difficulty);
        setSelectedOptions({ ...selectedOptions, difficulty });
        console.log('Selected Difficulty:', difficulty);
    };

    const handleTypeSelection = (type: string) => {
        setSelectedType(type);
        setSelectedOptions({ ...selectedOptions, type });
        console.log('Selected Type:', type);
    };

    const handleStartQuiz = () => {
        console.log('Selected Options:', selectedOptions);
        // Perform actions related to starting the quiz with selectedOptions
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={imageBackground} style={styles.imageBackground}>
                <View style={styles.starContainer}>
                    <TouchableOpacity onPress={goToRanking}>
                        <Image source={starIcon} style={styles.starIcon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.formContainer}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Text style={styles.label}>Choose Category:</Text>
                                <SelectDropdown
                                    data={['Sport', 'Software']}
                                    onSelect={(selectedItem) => onChange(selectedItem)}
                                    defaultButtonText={value || 'Sport'}
                                    buttonStyle={styles.dropdownButton}
                                    dropdownStyle={styles.dropdown}
                                    rowTextStyle={styles.dropdownText}
                                />
                            </>
                        )}
                        name="category"
                        defaultValue="Sport"
                    />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[
                                styles.difficultyButton,
                                selectedDifficulty === 'low' && styles.selectedButton,
                            ]}
                            onPress={() => handleDifficultySelection('low')}
                        >
                            <Text style={styles.buttonText}>Low</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.difficultyButton,
                                selectedDifficulty === 'medium' && styles.selectedButton,
                            ]}
                            onPress={() => handleDifficultySelection('medium')}
                        >
                            <Text style={styles.buttonText}>Medium</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.difficultyButton,
                                selectedDifficulty === 'hard' && styles.selectedButton,
                            ]}
                            onPress={() => handleDifficultySelection('hard')}
                        >
                            <Text style={styles.buttonText}>Hard</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[
                                styles.typeButton,
                                selectedType === 'TrueFalse' && styles.selectedButton,
                            ]}
                            onPress={() => handleTypeSelection('TrueFalse')}
                        >
                            <Text 
                            style={[
                                styles.typeButton,
                                selectedType === 'Multiple' && styles.selectedButtonTypeText,
                            ]}
                            >True/False</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.typeButton,
                                selectedType === 'Multiple' && styles.selectedButtonType,
                            ]}
                            onPress={() => handleTypeSelection('Multiple')}
                        >
                            <Text
                               style={[
                                styles.typeButton,
                                selectedType === 'Multiple' && styles.selectedButtonTypeText,
                            ]}
                            
                            >Multiple</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footer}>

                <TouchableOpacity  onPress={handleStartQuiz}>
          <View style={styles.btnLogin}>
            <Text style={styles.loginText}>Start QUIZ</Text>
            <Image source={arrowWImage} style={styles.arrowWImage} />
          </View>
        </TouchableOpacity>
                </View>

            </ImageBackground>
        </View>
    );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        backgroundColor: "#6A5AE0",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 40,
    },
    starContainer: {
        width: 300,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignContent: 'center',
    },
    starIcon: {
        width: 20,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 21,
        textAlign: 'left',
        color: '#fff',

    },
    dropdownButton: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 20,
        width: windowWidth * 0.8,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dropdown: {
        borderWidth: 1,
        borderRadius: 8,
        width: windowWidth * 0.8,
        backgroundColor: '#fff',
        marginTop: 4,
    },
    dropdownText: {
        fontSize: 16,
    },
    startButton: {
        backgroundColor: '#6A5AE0',

        alignItems: 'center',
        marginBottom: 20,
        width: 315,
        height: 60,

        padding: 18,
        borderRadius: 10,
        gap: 11,

    },
    startButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        
    },
    difficultyButton: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginRight: 10,
        color: '#6A5AE0',
    },
    typeButton: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginRight: 10,
        color: '#6A5AE0',
    },
    selectedButton: {
        backgroundColor: '#6A5AE0',
    },
    selectedButtonType:{
        backgroundColor: '#6A5AE0',
        
    },
    selectedButtonTypeText:{
        color: '#fff',
    },
    btnLogin: {
        width: 311,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#6A5AE0',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 25,
      },
      loginText: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        textAlign: 'center',
        color: '#fff',
        marginRight: 100,
      },
      arrowWImage: {
        marginRight: 1,
      },
      footer:{
        marginBottom:20,
      }
});

export default HomeScreen;

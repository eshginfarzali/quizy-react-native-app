import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, ImageBackground, StyleSheet, View, Dimensions, TouchableOpacity, Text, StatusBar } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import SelectDropdown from 'react-native-select-dropdown';
import { useDispatch, useSelector } from 'react-redux';


import { setCategory, selectCategory } from '../redux/features/categorySlice';
import { setDifficulty, selectDifficulty } from '../redux/features/difficultySlice';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const imageBackground = require('../assets/images/background.png');
const starIcon = require('../assets/icons/star.png');
const dropdownIcon = require('../assets/icons/downward.png');
const arrowWImage = require('../assets/icons/arrowWhite.png');
const clockIcon = require('../assets/icons/clock.png');


type RootStackParamList = {
    Home: undefined;
    Ranking: undefined;
    Options: undefined;
    TrueFalse: undefined;
    Multiple: undefined;
};
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type FormData = {
    category: string;
    difficulty: string;
    type: string;
};

export const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const { control } = useForm<FormData>();
    const [selectedType, setSelectedType] = useState('');
    const [selectedOptions, setSelectedOptions] = useState<FormData>({
        category: 'Sport',
        difficulty: 'low',
        type: 'TrueFalse',
    });

    const dispatch = useDispatch();
    const selectedCategory = useSelector(selectCategory);
    const selectedDifficulty = useSelector(selectDifficulty);

    const goToRanking = () => {
        navigation.navigate('Ranking');
    };


    const handleDifficultySelection = (difficulty: string) => {
        dispatch(setDifficulty(difficulty));
        setSelectedOptions({ ...selectedOptions, difficulty });
    };

    const handleTypeSelection = (type: string) => {
        setSelectedType(type);
        setSelectedOptions({ ...selectedOptions, type });
    };

    const handleCategorySelection = (category: string) => {
        dispatch(setCategory(category))
        setSelectedOptions({ ...selectedOptions, category });
    };

    const handleStartQuiz = () => {
        if (selectedOptions.type === 'TrueFalse') {
            navigation.navigate('TrueFalse');
        } else if (selectedOptions.type === 'Multiple') {
            navigation.navigate('Multiple');
        }

    };
    function goToType() {
        throw new Error('Function not implemented.');
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'#6A5AE0'} barStyle="light-content" />
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
                                <View style={styles.labelContainer}>
                                    <Text style={styles.label}>Choose Category</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {

                                        handleCategorySelection(value);
                                    }}
                                >
                                    <View style={styles.dropdownContainer}>
                                        <Text style={[styles.label, { color: '#fff', fontSize: 20, }]}>
                                            {selectedCategory}
                                        </Text>
                                        <Image
                                            source={dropdownIcon}
                                            style={styles.dropdownIcon}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <>
                                            <SelectDropdown
                                                data={['Sport', 'Software']}
                                                onSelect={(selectedItem) => {
                                                    onChange(selectedItem);
                                                    handleCategorySelection(selectedItem);

                                                }}
                                                buttonStyle={styles.dropdownButton}
                                                dropdownStyle={styles.dropdown}
                                                rowTextStyle={styles.dropdownText}
                                                defaultValue={selectedCategory}
                                                buttonTextStyle={styles.buttonTextStyle}
                                            />
                                        </>
                                    )}
                                    name="category"
                                    defaultValue="Sport"
                                />
                            </>
                        )}
                        name="category"
                        defaultValue="Sport"
                    />

                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Choose level</Text>
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[
                                styles.difficultyButton,
                                selectedDifficulty === 'low' && styles.selectedButtonLow,
                            ]}
                            onPress={() => handleDifficultySelection('low')}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    selectedDifficulty === 'low' && styles.selectedButtonText,
                                ]}
                            >Low</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.difficultyButton,
                                selectedDifficulty === 'medium' && styles.selectedButtonMedium,
                            ]}
                            onPress={() => handleDifficultySelection('medium')}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    selectedDifficulty === 'medium' && styles.selectedButtonText,
                                ]}
                            >Medium</Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.difficultyButton,
                                selectedDifficulty === 'hard' && styles.selectedButtonHard,
                            ]}
                            onPress={() => handleDifficultySelection('hard')}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    selectedDifficulty === 'hard' && styles.selectedButtonText,
                                ]}
                            >Hard</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Choose type</Text>
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[
                                styles.typeButton,
                                selectedType === 'TrueFalse' && styles.selectedButtonType,
                            ]}
                            onPress={() => handleTypeSelection('TrueFalse')}
                        >
                            <Text
                                style={[
                                    styles.typeButtonText,
                                    selectedType === 'TrueFalse' && styles.selectedButtonTypeText,
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
                                    styles.typeButtonText,
                                    selectedType === 'Multiple' && styles.selectedButtonTypeText,
                                ]}

                            >Multiple</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.clockConatiner}>
                        <Image source={clockIcon} />
                        <Text style={styles.textClock}>{selectedDifficulty === 'hard' ? 10 : selectedDifficulty === 'medium' ? 15 : 20} sec</Text>
                    </View>
                </View>
                <View style={styles.footer}>

                    <TouchableOpacity onPress={handleStartQuiz}>
                        <View style={styles.btnQuiz}>
                            <Text style={styles.quizText}>Start QUIZ</Text>
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
    labelContainer: {
        width: 330,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
    },
    label: {
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 21,
        textAlign: 'left',
        color: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',

    },
    dropdownButton: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 20,
        width: windowWidth * 0.8,
        marginTop: -30,
        opacity: 0,
        backgroundColor: '#6A5AE0',
        color: '#fff',
    },
    buttonTextStyle: {
        color: '#6A5AE0'
    },
    dropdownContainer: {
        flexDirection: 'row',
        width: 300,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: -20,
        marginLeft: -29,
    },

    dropdown: {
        borderWidth: 1,
        borderRadius: 8,
        width: windowWidth * 0.8,
        backgroundColor: '#fff',
        marginTop: 5,
        color: '#fff',
    },
    dropdownIcon: {

    },
    dropdownText: {
        fontSize: 18,
        color: '#6a5ae0',
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
        color: '#6A5AE0',
        fontFamily: 'Poppins',
        fontWeight: '600',
        lineHeight: 24,

    },
    selectedButtonText: {

        color: '#fff'
    },
    selectedButtonLow: {
        backgroundColor: '#FF9C00',

    },
    selectedButtonMedium: {
        backgroundColor: '#31B057',

    },
    selectedButtonHard: {
        backgroundColor: '#FD3654',
    },
    difficultyButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        flex: 1,
        marginRight: 10,
    },

    typeButton: {
        backgroundColor: '#fff',
        padding: 17,
        borderRadius: 8,
        flex: 1,
        marginRight: 10,
    },
    selectedButtonType: {
        backgroundColor: '#5e4ddb',

    },
    typeButtonText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#6A5AE0',
        fontFamily: 'Poppins',
        fontWeight: '600',
        lineHeight: 24,
    },
    selectedButtonTypeText: {
        color: '#fff',
    },
    btnQuiz: {
        width: 311,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#5e4ddb',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 25,
    },
    quizText: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        textAlign: 'center',
        color: '#fff',
        marginRight: 90,
    },
    clockConatiner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    textClock: {
        fontFamily: 'Poppins',
        fontSize: 25,
        fontWeight: '400',
        lineHeight: 30,
        color: '#fff'

    },
    arrowWImage: {
        marginRight: 3,
    },
    footer: {
        marginBottom: 20,
    }
});

export default HomeScreen;

import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';import { Image, ImageBackground, StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const imageBackground = require('../assets/images/background.png');
const arrowleft = require('../assets/icons/arrowleft.png');
const oneTwoThree = require('../assets/images/oneTwoThree.png');


type RootStackParamList = {
  Home: undefined;
  Ranking: undefined;


};
type RankingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Ranking'>;



export const RankingScreen = () => {

    const navigation = useNavigation<RankingScreenNavigationProp>();


  const goToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={imageBackground}
        style={styles.imageBackground}
      >
        <TouchableOpacity
          onPress={goToHome}
        >
        <View style={styles.headerContainer}>
          <Image source={arrowleft} style={styles.leftIcon} />
          <Text style={styles.headerText}>Rankings</Text>
        </View>
          </TouchableOpacity>
          <View style={styles.rankingContainer}>
          <Image source={oneTwoThree} style={styles.rankingImage} />
          </View>
      </ImageBackground>
    </View>
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
  },
  headerContainer: {
    padding:20,
    flexDirection:'row',
    alignItems: 'center',
    gap:10,
  },
  leftIcon: {
  width:30,
  
  },
  headerText:{
fontFamily: 'Rubik',
fontSize: 24,
fontWeight: 'bold',
lineHeight: 36,
color: '#fff',
  },
  rankingContainer:{
    flexDirection:'row',
    justifyContent: 'center',
 alignItems: 'center',
  },
  rankingImage:{

  },
});

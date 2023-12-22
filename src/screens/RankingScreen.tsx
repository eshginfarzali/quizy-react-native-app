import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';import { Image, ImageBackground, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const imageBackground = require('../assets/images/background.png');
const logoImage = require('../assets/images/logo.png');


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
        <View style={styles.logoContainer}>
        <TouchableOpacity
          onPress={goToHome}
        >
          <Image source={logoImage} style={styles.logo} />
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: windowHeight / 2 - 75,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});

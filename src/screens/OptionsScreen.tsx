import React from 'react';
import { Image, ImageBackground, StyleSheet, View, Dimensions, Text,  TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const imageBackground = require('../assets/images/background.png');
const logoImage = require('../assets/images/logo.png');
const illImage = require('../assets/images/illustration.png');
const arrowWImage = require('../assets/icons/arrowWhite.png');
const arrowPImage = require('../assets/icons/arrowPurple.png');

type RootStackParamList = {
  Options: undefined;
  Login: undefined ;
  Register: undefined;

};

type OptionsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Options'>;

export const OptionsScreen = () => {
  const navigation = useNavigation<OptionsScreenNavigationProp>();

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const goToRegister = () => {
    navigation.navigate('Register');
  };


  return (
    <View style={styles.container}>
      <ImageBackground
        source={imageBackground}
        style={styles.imageBackground}
      >
        <View style={styles.logoContainer}>
          <Image source={logoImage} style={styles.logo} />
        </View>

        <View style={styles.illContainer}>
          <Image source={illImage} style={styles.ill} />
        </View>

        <View style={styles.textContainer}>
          <View style={styles.textTitleContainer}>
            <Text style={styles.textTitle}>
              Login or Sign Up
            </Text>
            <Text style={styles.textSubTitle}>
              Login or create an account to take quiz, take part in challenge, and more.
            </Text>
          </View>

          <View >
            <TouchableOpacity

             onPress={goToLogin}
            >
              <View style={styles.btnLogin}>
                <Text style={styles.loginText}>Login</Text>

                <Image source={arrowWImage} style={styles.arrowWImage} />
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
             onPress={goToRegister}
            >
              <View style={styles.btnAcc}>
                <Text style={styles.accText}>Create account</Text>

                <Image source={arrowPImage} style={styles.arrowWImage} />
              </View>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "#6A5AE0",
    width: windowWidth,
    height: windowHeight,
    resizeMode: 'cover',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  logoContainer: {
    paddingTop: 40,
    width: 100,
    height: 170,
  },
  logo: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
  illContainer: {
    width: 380,
    height: 280,

  },
  ill: {
    width: 360,
    height: 350,
    resizeMode: 'contain',
  },
  textContainer: {
    width: 343,
    height: 286,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textTitleContainer: {
    // flex: 1,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 36,
    textAlign: 'center',
    color: '#001833',
    marginTop: 10,
  },
  textSubTitle: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  btnLogin: {
    width: 311,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#6A5AE0',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
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

    marginRight: 10,
  },
  btnAcc: {
    width: 311,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#EFEEFC',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  accText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
    color: '#6A5AE0',
    marginRight: 58,
  },

});

export default OptionsScreen;

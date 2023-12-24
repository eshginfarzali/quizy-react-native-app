import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput, Alert, StatusBar } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({
  name: 'rn_sqlite',
});
const arrowBackIcons = require('../assets/icons/arrowBack.png');
const arrowWImage = require('../assets/icons/arrowWhite.png');


type RootStackParamList = {
  Home: undefined;
  Options: undefined;
};

type FormData = {
  email: string;
  password: string;
};

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Options'>;

export const LoginScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    try {
      const dbResult = await checkUserCredentials(email, password);
      if (dbResult) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error checking credentials:', error);
    }
  };

  const checkUserCredentials = async (email: string, password: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      (await db).transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM users WHERE email = ? AND password = ?',
          [email, password],
          (_, results) => {
            if (results.rows.length > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#EFEEFC'}
        barStyle="dark-content"
      />
      <TouchableOpacity onPress={() => navigation.navigate('Options')}>
        <View style={styles.headerContainer}>
          <Image source={arrowBackIcons} />
          <Text style={styles.textLogin}>Login</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.loginFormContainer}>
        <View>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Enter email"
              />
            )}
            name="email"
            rules={{ required: true }}
          />
        </View>
        <View>
          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Enter password"
                secureTextEntry={true}
              />
            )}
            name="password"
            rules={{ required: true }}
          />
        </View>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <View style={styles.btnLogin}>
            <Text style={styles.loginText}>Login</Text>
            <Image source={arrowWImage} style={styles.arrowWImage} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEEFC',
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 10,
  },
  textLogin: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 36,
    letterSpacing: 0,
    color: '#001833',
  },
  loginFormContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  label: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 21,
    color: '#121212',
    marginBottom: 5,
    marginTop: 25,
  },
  input: {
    backgroundColor: 'white',
    width: 311,
    height: 60,
    borderRadius: 10,
    borderColor: '#6A5AE0',
    borderWidth: 1,
    paddingLeft: 5,
    color: '#121212',
    fontSize: 20,
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
    marginRight: 10,
  },
});

export default LoginScreen;

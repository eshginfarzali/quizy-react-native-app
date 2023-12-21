import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm, Controller } from "react-hook-form";

const arrowBackIcons = require('../assets/icons/arrowBack.png');
const arrowWImage = require('../assets/icons/arrowWhite.png');


type RootStackParamList = {
  Login: undefined;
  Options: undefined;
};
type FormData = {
  name:string,
  email: string;
  password: string;
  confirmPassword: string,
};

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;



export const RegisterScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const goToLogin = () => {
    navigation.navigate('Options');
  };

  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      name:'',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };



  console.log('errors', errors);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={goToLogin}
      >
        <View style={styles.headerContainer}>
          <Image source={arrowBackIcons} />
          <Text style={styles.textLogin}>Create account</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.loginFormContainer}>

        <View>

          <Text style={styles.label}>Name</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="name"
            rules={{ required: true }}
          />
        </View>
        <View>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
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
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="password"
            rules={{ required: true }}
          />
        </View>
        <View>
          <Text style={styles.label}> Confirm Password</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="confirmPassword"
            rules={{ required: true }}
          />
        </View>



        <View >
          <TouchableOpacity

            onPress={handleSubmit(onSubmit)}
          >
            <View style={styles.btnLogin}>
              <Text style={styles.loginText}>Login</Text>

              <Image source={arrowWImage} style={styles.arrowWImage} />
            </View>
          </TouchableOpacity>

        </View>
      </View>
    </View>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEEFC',
    justifyContent: 'space-between'
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
    marginBottom:5,
    marginTop:25,
  },


  input: {
    backgroundColor: 'white',
    width: 311,
    height: 60,
    borderRadius: 10,
    borderColor: '#6A5AE0',
    borderWidth: 1,
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

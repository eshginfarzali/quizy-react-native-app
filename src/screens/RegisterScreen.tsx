import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput, Alert, ScrollView, StatusBar } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm, Controller } from "react-hook-form";
import { openDatabase } from "react-native-sqlite-storage";
const db = openDatabase({
  name: "rn_sqlite",
});

const arrowBackIcons = require('../assets/icons/arrowBack.png');
const arrowWImage = require('../assets/icons/arrowWhite.png');

type RootStackParamList = {
  Login: undefined;
  Options: undefined;
};

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const RegisterScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const goToLogin = () => {
    navigation.navigate('Options');
  };

  const { control, handleSubmit, formState: { errors }, getValues } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  React.useEffect(() => {
    const initializeDatabase = async () => {
      const database = await db;
      database.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT)'
        );
      });
    };
  
    initializeDatabase();
  }, []);
  

  const onSubmit = async (data: FormData) => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    console.log(data); 

    (await  db).transaction((tx) => {
      tx.executeSql(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [data.name, data.email, data.password],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('Registration data saved successfully');
            navigation.navigate('Login'); 
          } else {
            console.log('Failed to save registration data');
          }
        },
        (error) => {
          console.error('Error while inserting data: ', error);
        }
      );
    });
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
            <StatusBar backgroundColor={'#EFEEFC'} 
            barStyle="dark-content"
            />
      <View style={styles.container}>
        <TouchableOpacity onPress={goToLogin}>
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
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="name"
              rules={{
                required: true,
                minLength: 3,
                maxLength: 25,
              }}
            />
            {errors.name && errors.name.type === 'required' && (
              <Text style={styles.errorText}>Name is required.</Text>
            )}
            {errors.name && errors.name.type === 'minLength' && (
              <Text style={styles.errorText}>Name should be at least 3 characters.</Text>
            )}
            {errors.name && errors.name.type === 'maxLength' && (
              <Text style={styles.errorText}>Name should not exceed 25 characters.</Text>
            )}
          </View>

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
              />
            )}
            name="email"
            rules={{
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                message: 'Invalid email address.',
              },
            }}
          />
          {errors.email && errors.email.type === 'required' && (
            <Text style={styles.errorText}>Email is required.</Text>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
        </View>

          <View>
            <Text style={styles.label}>Password</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true}
                />
              )}
              name="password"
              rules={{
                required: true,
                minLength: 8,
                maxLength: 25,
              }}
            />
            {errors.password && errors.password.type === 'required' && (
              <Text style={styles.errorText}>Password is required.</Text>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <Text style={styles.errorText}>Password should be at least 8 characters.</Text>
            )}
            {errors.password && errors.password.type === 'maxLength' && (
              <Text style={styles.errorText}>Password should not exceed 25 characters.</Text>
            )}
          </View>

          <View>
            <Text style={styles.label}>Confirm Password</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true}
                />
              )}
              name="confirmPassword"
              rules={{
                required: true,
                validate: {
                  matchesPassword: (value) => value === getValues('password') || 'Passwords do not match.',
                },
              }}
            />
            {errors.confirmPassword && errors.confirmPassword.type === 'required' && (
              <Text style={styles.errorText}>Confirm Password is required.</Text>
            )}
            {errors.confirmPassword && errors.confirmPassword.type === 'matchesPassword' && (
              <Text style={styles.errorText}>Passwords do not match.</Text>
            )}
          </View>

          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <View style={styles.btnLogin}>
              <Text style={styles.loginText}>Register</Text>
              <Image source={arrowWImage} style={styles.arrowWImage} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    color: '#121212',
    fontSize:20,
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },

});

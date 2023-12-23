import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';


import { store } from './src/redux/store';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { OptionsScreen } from './src/screens/OptionsScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { RankingScreen } from './src/screens/RankingScreen';
import { TrueFalseScreen } from './src/screens/TrueFalseScreen';
import { MultipleScreen } from './src/screens/MultipleScreen';
import { FinishScreen } from './src/screens/FinishScreen';

type RootStackParamList = {
  Welcome: undefined;
  Options: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Ranking: undefined;
  TrueFalse:undefined;
  Multiple: undefined;
  Finish: undefined;

};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <Provider store={store}>
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={'#6A5AE0'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Options" component={OptionsScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Ranking" component={RankingScreen} />
          <Stack.Screen name="TrueFalse" component={TrueFalseScreen} />
          <Stack.Screen name="Multiple" component={MultipleScreen} />
          <Stack.Screen name="Finish" component={FinishScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
    </Provider>
  );
}

export default App;

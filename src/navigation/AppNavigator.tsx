import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ConfiguracoesSensoriaisScreen from '../screens/ConfiguracoesSensoriaisScreen';
import IAEmotionScreen from '../screens/IAEmotionScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  ConfiguracoesSensoriais: undefined;
  IAEmotion: undefined;
  Videos: undefined;

};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen 
          name="ConfiguracoesSensoriais" 
          component={ConfiguracoesSensoriaisScreen} 
          options={{ title: 'Ajustes Sensoriais' }} 
        />
        <Stack.Screen name="IAEmotion" component={IAEmotionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

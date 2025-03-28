// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import 'react-native-gesture-handler';
import { RootStackParamList } from './src/navigation/AppNavigator';
import ConfiguracoesSensoriaisScreen from './src/screens/ConfiguracoesSensoriaisScreen';
import AppNavigator from './src/navigation/AppNavigator';



const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen 
  name="ConfiguracoesSensoriais" 
  component={ConfiguracoesSensoriaisScreen} 
  options={{ title: 'Ajustes Sensoriais' }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
  
};

export default App;

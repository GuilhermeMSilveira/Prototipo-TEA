// src/navigation/AppNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ConfiguracoesSensoriaisScreen from '../screens/ConfiguracoesSensoriaisScreen';
import RelatoriosScreen from '../screens/RelatoriosScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ConfiguracoesSensoriais" component={ConfiguracoesSensoriaisScreen} />
        <Stack.Screen name="Relatorios" component={RelatoriosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

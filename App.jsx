import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { lightColors, darkColors } from './assets/screens/colors/colorsPalettes.jsx';
import { useColorScheme, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';

const Stack = createStackNavigator();

const App = () => {
  const colorScheme = useColorScheme();
  const palette = colorScheme === 'dark' ? darkColors : lightColors;

  return (
    <NavigationContainer>
      
    </NavigationContainer>
  );
};

export default App;

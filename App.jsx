import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { lightColors, darkColors } from './assets/screens/colors/colorsPalettes.jsx';
import { useColorScheme, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Camera, UrlResults, UrlScan } from './assets/screens/index.jsx';

const Stack = createNativeStackNavigator();

const App = () => {
  const colorScheme = useColorScheme();
  const palette = colorScheme === 'dark' ? darkColors : lightColors;

  return (
    <NavigationContainer initialRouteName = "Camera">
      <Stack.Navigator>
        <Stack.Screen name = "Home" component = {Home} options = {{ headerShwon : false }}/>
        <Stack.Screen name = "Camera" component = {Camera} options = {{ headerShwon : false }}/>
        <Stack.Screen name = "UrlResults" component = {UrlResults} options = {{ headerShwon : false }}/>
        <Stack.Screen name = "UrlScan" component = {UrlScan} options = {{ headerShwon : false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

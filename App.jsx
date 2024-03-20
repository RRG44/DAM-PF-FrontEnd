import React, { useState, useEffect, useCallback } from 'react';
import { lightColors, darkColors } from './assets/screens/colors/colorsPalettes.jsx';
import { useColorScheme, SafeAreaView, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Prueba } from './assets/screens/index.jsx';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const colorScheme = useColorScheme();
  const palette = colorScheme === 'dark' ? darkColors : lightColors;
  
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Inter': require('./assets/fonts/Inter-VariableFont_slnt,wght.ttf'),
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    onLayoutRootView();
  }, [appIsReady]);


  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer initialRouteName="Prueba">
    <StatusBar barStyle={'light-content'} backgroundColor={palette.primary}/>
      <Stack.Navigator>
        <Stack.Screen name="Prueba" component={Prueba} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

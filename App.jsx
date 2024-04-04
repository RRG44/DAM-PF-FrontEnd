import React, { useState, useEffect } from 'react';
import { lightColors, darkColors } from './assets/screens/colors/colorsPalettes.jsx';
import { useColorScheme, StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, SplashScreen, CleanEXIF } from './assets/screens/index.jsx';
import * as Font from 'expo-font';
import { Header } from './assets/components/index.jsx';

const Stack = createNativeStackNavigator();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const colorScheme = useColorScheme();
  const palette = colorScheme === 'dark' ? darkColors : lightColors;
  
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
          'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
          'Inter-ExtraBold': require('./assets/fonts/Inter-ExtraBold.ttf'),
          'Inter-ExtraLight': require('./assets/fonts/Inter-ExtraLight.ttf'),
          'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
          'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
          'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
          'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
          'Inter-Thin': require('./assets/fonts/Inter-Thin.ttf'),
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

  return (
    <SafeAreaView style={{backgroundColor: palette.primary, flex: 1}}>
      {appIsReady ? (
        <>
          <NavigationContainer>
            <StatusBar barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} backgroundColor={palette.primary}/>
            <Header palette={palette}/>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name='Home' component={Home}/>
              <Stack.Screen name='CleanEXIF' component={CleanEXIF}/>
            </Stack.Navigator>
          </NavigationContainer>
        </>
      ) : (
          <SplashScreen palette={palette} colorScheme={colorScheme}/>
      )}
    </SafeAreaView>
  );
};

export default App;
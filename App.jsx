import 'react-native-gesture-handler'; // ! NEEDS TO BE HERE AT THE BEGGINING
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { lightColors, darkColors } from './assets/screens/colors/colorsPalettes.jsx';
import { useColorScheme, View, Text, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home, Camera, UrlResults, UrlScan, Academy, CleanExif } from './assets/screens/index.jsx';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const LogoTitle = () => {
  return (
    <View style = {{alignContent: 'center', justifyContent: 'center', flexDirection: 'row',}}>
      <Image 
        style = {{height: 38, width: 30}}
        source={require('./assets/images/Slogo.png')}/>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}> secure surf</Text>
    </View>
  );
};

const App = () => {
  const colorScheme = useColorScheme();
  const palette = colorScheme === 'dark' ? darkColors : lightColors;

  return (
    
    <NavigationContainer>
      <Drawer.Navigator initialRouteName = "Home" 
          screenOptions={{
            headerTitle: () => <LogoTitle />,
            headerTitleAlign: 'center'
          }}
        >

        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Scan Url" component={UrlScan} />
        <Drawer.Screen name="Clean Exif" component={CleanExif} />
        <Drawer.Screen name="Academy" component={Academy} />
          {/* This screens are not shown in drawer, but must be navigable  */}
        <Drawer.Screen name="Results" component={UrlResults} options={{ drawerLabel: () => null }}/>
        <Drawer.Screen name="Camera" component={Camera} options={{ drawerLabel: () => null, headerShown: false }}/>

      </Drawer.Navigator>
    </NavigationContainer>

  );
};

export default App;

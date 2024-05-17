import React from 'react';
import { Image, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import logodark from '../images/dark/logo.png';
import logolight from '../images/light/logo.png';

const SplashScreen = ({ palette, colorScheme }) => {
  const logoSource = colorScheme === 'light' ? logolight : logodark;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: palette.primary,
    },
    logo: {
      width: 250,
      resizeMode: 'contain',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} backgroundColor={palette.primary}/>
        <Image
          style={styles.logo}
          source={logoSource}
          />
    </SafeAreaView>
  );
};

export default SplashScreen;
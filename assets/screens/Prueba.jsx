import React from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import { lightColors, darkColors } from './colors/colorsPalettes.jsx';

const Prueba = () => {
  const colorScheme = useColorScheme();
  const palette = colorScheme === 'dark' ? darkColors : lightColors;

  return (
    <View>
      <Text style={{color: palette.green, fontFamily:'Inter'}}>Prueba</Text>
    </View>
  );
}

export default Prueba;
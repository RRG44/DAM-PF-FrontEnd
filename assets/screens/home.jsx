import React from 'react';
import {StyleSheet, View, useColorScheme, ScrollView} from 'react-native';
import { lightColors, darkColors } from './colors/colorsPalettes.jsx';
import { Subtitle, Title, ButtonMain} from '../components/index.jsx';

import academyIcon from "../images/academy.png"
import exifIcon from "../images/exif.png"
import qrIcon from "../images/qr.png"

const Home = ({navigation}) => {
  const colorScheme = useColorScheme();
  const palette = colorScheme === 'dark' ? darkColors : lightColors;

  const styles = StyleSheet.create({
    container:{
      display: 'flex',
      flex: 1,
      backgroundColor: palette.primary,
      width: '100%',
    },
    content:{
      width: '85%',
      alignSelf: 'center',
    }
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Title palette={palette} text="Home"/>
        <Subtitle palette={palette} text="Services :"/>
        <ButtonMain palette={palette} text="Scan URL" source={qrIcon} onPress={() => navigation.navigate('Scan Url')}/>
        <ButtonMain palette={palette} text="Clean EXIF" source={exifIcon} onPress={() => navigation.navigate('Clean Exif')}/>
        <ButtonMain palette={palette} text="Academy" source={academyIcon} onPress={() => navigation.navigate('Academy')}/>
      </ScrollView>
    </View>
  );
}

export default Home;
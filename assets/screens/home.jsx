import React from 'react';
import {StyleSheet, View, useColorScheme, ScrollView} from 'react-native';
import { lightColors, darkColors } from './colors/colorsPalettes.jsx';
import { Subtitle, Title, ButtonMain} from '../components/index.jsx';

import AcademyLight from '../images/light/Academy.png';
import AcademyDark from '../images/dark/Academy.png';
import ImgLight from '../images/light/Img.png';
import ImgDark from '../images/dark/Img.png';
import QRLight from '../images/light/QR.png';
import QRDark from '../images/dark/QR.png';

const Home = ({navigation}) => {
  const colorScheme = useColorScheme();
  const palette = colorScheme === 'dark' ? darkColors : lightColors;

  const Academy = colorScheme === 'dark' ? AcademyDark : AcademyLight;
  const Img = colorScheme === 'dark' ? ImgDark : ImgLight;
  const QR = colorScheme === 'dark' ? QRDark : QRLight;

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
        <ButtonMain palette={palette} text="Scan URL" source={QR} onPress={() => navigation.navigate('Scan Url')}/>
        <ButtonMain palette={palette} text="Clean EXIF" source={Img} onPress={() => navigation.navigate('Clean Exif')}/>
        <ButtonMain palette={palette} text="Academy" source={Academy} onPress={() => navigation.navigate('Academy')}/>
      </ScrollView>
    </View>
  );
}

export default Home;
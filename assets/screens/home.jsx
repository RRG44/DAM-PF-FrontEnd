import React from 'react';
import {StyleSheet, View, useColorScheme, ScrollView, Alert, Linking} from 'react-native';
import { lightColors, darkColors } from './colors/colorsPalettes.jsx';
import { Subtitle, Title, ButtonMain} from '../components/index.jsx';
import { useCameraPermissions } from "expo-camera/next.js";
import * as MediaLibrary from "expo-media-library"; //npm install expo-media-library

import academyIcon from "../images/academy.png"
import exifIcon from "../images/exif.png"
import qrIcon from "../images/qr.png"

const Home = ({navigation}) => {
  const colorScheme = useColorScheme();
  const palette = colorScheme === 'dark' ? darkColors : lightColors;

  const [cameraPermission, requestPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

  const checkPermissionsCamNavigate = async () => {
    if (cameraPermission?.status === 'granted') {
      navigation.navigate('Scan Url');
    } else {
      const permissionResponse = await requestPermission();
      if (permissionResponse.granted) {
        navigation.navigate('Scan Url');
      } else {
        Alert.alert(
          "Permisos necesarios",
          'Necesitas otorgar permisos para acceder a Scan URL. Por favor, ve a la configuración de tu dispositivo y otorga permisos a Cámara.',
          [{ text: "Ir a configuración", onPress: () => Linking.openSettings() }]
        );
      }
    }
  };

  const checkPermissionsFileNavigate = async () => {
    if (mediaLibraryPermission?.status === 'granted') {
      navigation.navigate('Clean Exif');
    } else {
      const permissionResponse = await requestMediaLibraryPermission();
      if (permissionResponse.granted) {
        navigation.navigate('Clean Exif');
      } else {
        Alert.alert(
          "Permisos necesarios",
          'Necesitas otorgar permisos para acceder a Clean Exif. Por favor, ve a la configuración de tu dispositivo y otorga permisos a Multimedia.',
          [{ text: "Ir a configuración", onPress: () => Linking.openSettings() }]
        );
      }
    }
  };

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
        <ButtonMain palette={palette} text="Scan URL" source={qrIcon} onPress={checkPermissionsCamNavigate} />
        <ButtonMain palette={palette} text="Clean EXIF" source={exifIcon} onPress={() => navigation.navigate('Clean Exif')}/>
        <ButtonMain palette={palette} text="Academy" source={academyIcon} onPress={() => navigation.navigate('Academy')}/>
      </ScrollView>
    </View>
  );
}

export default Home;
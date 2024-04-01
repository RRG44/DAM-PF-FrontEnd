import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, Alert, View, SafeAreaView } from 'react-native';
import { ComponentButtonMain } from '../components/components';

export default function App({navigation}){
  return (
    <SafeAreaView style = {styles.safeArea}>
      <View style = {styles.mainContainer}>

        <Text style = {styles.title}>Home</Text>

        <ComponentButtonMain 
          onPress = {() => navigation.navigate('Scan Url')} 
          text = "Scann a URL"
          width = {300}
          height = {180}
          imgHeight = {90}
          imgWidth = {90}
          source = {require('../images/qr.png')}/>

        <ComponentButtonMain 
          onPress = {() => navigation.navigate('Clean Exif')} 
          text = "Clean Exif"
          width = {300}
          height = {180}
          imgHeight = {90}
          imgWidth = {90}
          source = {require('../images/exif.png')}/>

        <ComponentButtonMain 
          onPress = {() => navigation.navigate('Academy')} 
          text = "Academy"
          width = {300}
          height = {180}
          imgHeight = {90}
          imgWidth = {90}
          source = {require('../images/academy.png')}/>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea:
  {
    flex: 1,
    backgroundColor : '#fff'    
  },
  mainContainer :
  {
    flex: 1,
    alignItems : 'center',
    justifyContent : 'flex-start',
  },
  title:
  {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 15
  },
});
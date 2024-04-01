import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, Alert, View, SafeAreaView, BackHandler } from 'react-native';


export default function App({navigation}){

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Home');
      return true;
    });

    return () => BackHandler.remove; // Cleanup on unmount
  }, [navigation]);

  return (
    <SafeAreaView style = {styles.safeArea}>
      <View style = {styles.mainContainer}>
        <Text>Here goes CLEAN EXIF</Text>
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
    justifyContent : 'center',
  },
});
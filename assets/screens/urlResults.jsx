import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, Alert, View, SafeAreaView, BackHandler } from 'react-native';


export default function App({route, navigation}){

  const {url} = route.params

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Scan Url');
      return true;
    });

    return () => BackHandler.remove; // Cleanup on unmount
  }, [navigation]);

  return (
    <SafeAreaView style = {styles.safeArea}>
      <View style = {styles.mainContainer}>
        <Text>Here goes URL RESULTS: {url}</Text>
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
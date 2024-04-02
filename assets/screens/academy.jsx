import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, Alert, View, SafeAreaView, BackHandler } from 'react-native';


export default function App({navigation}){

  return (
    <SafeAreaView style = {styles.safeArea}>
      <View style = {styles.mainContainer}>
        <Text>Here goes ACADEMY</Text>
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
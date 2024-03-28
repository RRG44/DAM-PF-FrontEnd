import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, Alert, View } from 'react-native';


export default function Home(){
  return (
    <View style = {styles.mainContainer}>
      <Text>Here goes the home screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer :
  {
    width : '100%',
    height : '100%',
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : '#fff'
  },
});
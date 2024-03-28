import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, Alert, View, TextInput } from 'react-native';
import { ComponentButton, ComponentButtonMain } from '../components/components';

export default function App(){

  const [url, setUrl] = useState(null);

  return (
    <View style = {styles.mainContainer}>
      <Text style = {styles.title}>How to scan?:</Text>
      <Text>By QR</Text>
      <ComponentButtonMain text = "Scann a QR code"/>
      <TextInput
        style = {styles.input}
        multiline = {false}
        maxLength = {60} 
        placeholder = "Write a valid URL"
        onChangeText = { text => setUrl(text)}
        value = {url} 
      />
      <ComponentButton text = "Test Url"/>
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
  input : 
  {
    width: 300,
    height: 55,
    margin: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 5,
  },
  title:
  {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 15
  },
});
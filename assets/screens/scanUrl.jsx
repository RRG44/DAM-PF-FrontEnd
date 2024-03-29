import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, Alert, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ComponentButton, ComponentButtonMain } from '../components/components';

export default function App({navigation}){

  const [url, setUrl] = useState(null);

  return (
    <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
      <View style = {styles.mainContainer}>
        <Text style = {styles.title}>How to search?:</Text>
        <Text style = {styles.text}>Write a url:</Text>
        <TextInput
          style = {styles.input}
          multiline = {false}
          maxLength = {60} 
          placeholder = "Write a valid URL"
          onChangeText = { text => setUrl(text)}
          value = {url} 
        />
        <ComponentButton text = "Test Url"/>
        <Text style = {styles.text}>Scan a code with the camera:</Text>
        <ComponentButtonMain onPress = {() => navigation.navigate('Camera')} text = "Scann a QR code" source = {require('../images/qr.png')}/>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer :
  {
    width : '100%',
    height : '100%',
    alignItems : 'center',
    justifyContent : 'flex-start',
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
    fontSize: 16,
  },
  title:
  {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 15
  },
  text:
  {
    fontSize: 16,
    margin: 10,
  },
});
import { useEffect, useState } from 'react';
import { Button, 
  StyleSheet, Text, Alert, 
  View, TextInput, TouchableWithoutFeedback, Keyboard, 
  SafeAreaView, BackHandler } from 'react-native';
import { ComponentButton, ComponentButtonMain } from '../components/components';
import validator from 'validator';

export default function App({navigation}){

  const [url, setUrl] = useState('');

  function isValidURL(){

    if (!validator.isURL(url,{ require_valid_protocol : true, protocols: ['https','http','ftp']})){
      
      Alert.alert('Oops...', 'Seems like it\'s not a valid URL');
      setUrl('');
    
    } else {

      navigation.navigate('Results', {
        url : url
      });
      setUrl('');
    
    };

  };

  return (
    <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
      <SafeAreaView style = {styles.safeArea}>
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
          <ComponentButton text = "Test Url" onPress = {isValidURL}/>
          <Text style = {styles.text}>Scan a code with the camera:</Text>
          <ComponentButtonMain onPress = {() => navigation.navigate('Camera')} text = "Scan a QR code" source = {require('../images/qr.png')}/>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    fontSize: 20,
    margin: 10,
    fontWeight: '500',
  },
});
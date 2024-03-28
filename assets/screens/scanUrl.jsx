import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, Alert, View, TextInput } from 'react-native';


export default function Home(){

  const [url, setUrl] = useState(null);

  return (
    <View style = {styles.mainContainer}>
      <Text>Choose how to scan</Text>
      <TouchableOpacity>
        <Text>By QR</Text>
      </TouchableOpacity>
      <TextInput
        style = {styles.input}
        multiline = {false}
        maxLength = {60} 
        placeholder = "Write a valid URL"
        onChangeText = { text => setUrl(text)}
        value = {url} 
      />
      <TouchableOpacity>
        <Text>Test Url</Text>
      </TouchableOpacity>
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
    width: '80%'
  },
});
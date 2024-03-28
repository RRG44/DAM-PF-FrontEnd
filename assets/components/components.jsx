import { StyleSheet, Text, TouchableOpacity, Image, View, TextInput } from 'react-native';

export const ComponentButton = props => {

  const text = props.text ? props.text : "Text";

  const styles = props.style ? props.style : StyleSheet.create({
    button :
    {
      backgroundColor: props.backgroundColor ? props.backgroundColor : "#5863f8",
      width: props.width ? props.width : 250,
      height: props.height ? props.height : 55,
      margin: props.margin ? props.margin : 15,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:
    {
      fontSize: props.fontSize ? props.fontSize : 16,
      color: props.color ? props.color : 'white',
      padding: props.padding ? props.padding : 10,
    }
  }); 

  return (
    <TouchableOpacity style = {styles.button}>
        <Text style= {styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export const ComponentButtonMain = props => {

  const text = props.text ? props.text : "Text";
  const img = props.source ? props.source : require('../icon.png');

  const styles = props.style ? props.style : StyleSheet.create({
    button :
    {
      backgroundColor: props.backgroundColor ? props.backgroundColor : "#fff",
      width: props.width ? props.width : 300,
      height: props.height ? props.height : 300,
      margin: props.margin ? props.margin : 15,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:
    {
      fontSize: props.fontSize ? props.fontSize : 16,
      color: props.color ? props.color : 'black',
      padding: props.padding ? props.padding : 10,
    }
  }); 

  return (
    <TouchableOpacity style = {styles.button}>
      <Image 
        style = {{height: 100, width: 100}}
        source={img}/>
      <Text style= {styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
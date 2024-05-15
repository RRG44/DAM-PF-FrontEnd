import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

const ResultsContainer = (props) => {
  const text = props.text ? props.text : "Text";

  const styles = props.style ? props.style : StyleSheet.create({
    scroll :
    {
      backgroundColor: props.backgroundColor ? props.backgroundColor : "#fff",
      width: props.width ? props.width : 350,
      height: props.height ? props.height : 450,
      margin: props.margin ? props.margin : 15,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: 'black',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    text:
    {
      fontSize: props.fontSize ? props.fontSize : 16,
      color: props.color ? props.color : 'black',
      padding: props.padding ? props.padding : 15,
      fontWeight: props.fontWeight ? props. fontWeight: 'normal',
    },
  }); 

  return (
    <ScrollView style = {styles.scroll} persistentScrollbar={true}>
      <Text style= {styles.text}>{text}</Text>
    </ScrollView>
  );
};

export default ResultsContainer;
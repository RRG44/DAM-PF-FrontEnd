import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

const ResultsContainer = (props) => {
  const text = props.text ? props.text : "Text";

  const styles = props.style ? props.style : StyleSheet.create({
    scroll :
    {
      backgroundColor: props.palette.primary ? props.palette.primary : "#fff",
      width: props.width ? props.width : "100%",
      height: props.height ? props.height : 400,
      margin: props.margin ? props.margin : 0,
      marginBottom: 20,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: props.palette.secondary,
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    text:
    {
      fontSize: props.fontSize ? props.fontSize : 16,
      color: props.palette.font ? props.palette.font : 'black',
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
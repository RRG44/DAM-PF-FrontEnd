import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const Button = (props) => {
  const text = props.text ? props.text : "Text";

  const styles = props.style
    ? props.style
    : StyleSheet.create({
        button: {
          backgroundColor: props.color ? props.color : "#5863f8",
          width: props.width ? props.width : '100%',
          height: props.height ? props.height : 55,
          marginVertical: props.margin ? props.margin : 10,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        },
        text: {
          fontSize: props.fontSize ? props.fontSize : 20,
          color: props.palette.buttonfont ? props.palette.buttonfont : "white",
          padding: props.padding ? props.padding : 0,
        },
      });

  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
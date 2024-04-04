import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const Button = props => {
  const styles = StyleSheet.create({
    button: {
      height: 50,
      backgroundColor: props.color,
      borderRadius: 5,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: props.marginBottom,
    },
    text: {
      color: props.palette.font,
      fontSize: 20,
      fontFamily: "Inter-SemiBold"
    },
  });

  return(
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default Button;
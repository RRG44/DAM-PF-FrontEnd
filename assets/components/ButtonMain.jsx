import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";

const ButtonMain = (props) => {
  const text = props.text ? props.text : "Text";
  const img = props.source ? props.source : require("../images/Slogo.png");

  const styles = props.style
    ? props.style
    : StyleSheet.create({
        button: {
          width: props.width ? props.width : "100%",
          height: props.height ? props.height : 180,
          marginVertical: props.marginVertical ? props.marginVertical : 10,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: "black",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          borderColor: props.palette.secondary
            ? props.palette.secondary
            : "black",
          
        },
        text: {
          fontSize: props.fontSize ? props.fontSize : 20,
          color: props.palette.font ? props.palette.font : "black",
          padding: props.padding ? props.padding : 0,
          fontWeight: props.fontWeight ? props.fontWeight : "400",
          marginTop: props.marginTop ? props.marginTop : 10,
        },
        image: {
          height: props.imgHeight ? props.imgHeight : 100,
          width: props.imgWidth ? props.imgWidth : 100,
          marginVertical: props.imgMargin ? props.imgMargin : 10,
          resizeMode: "contain",
          tintColor: props.palette.secondary
        },
      });

  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Image style={styles.image} source={img} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonMain;
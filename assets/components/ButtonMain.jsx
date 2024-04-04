import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";

const ButtonMain = props => {

  const styles = StyleSheet.create({
        button: {
          display: 'flex',
          borderWidth: 1,
          borderColor: props.palette.secondary,
          borderRadius: 5,
          width: '100%',
          height: 160,
          marginBottom: 30,
          justifyContent: 'center',
          alignItems: 'center',
        },
        text: {
          fontFamily: 'Inter-Bold',
          fontSize: 20,
          color: props.palette.font,
          marginTop: 10,
        },
        image: {
          width: 90,
          height: 90,
          resizeMode: 'contain',
        },
      });

  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Image style={styles.image} source={props.source} />
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonMain;

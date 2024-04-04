import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";

const EXIFContainer = props => {
  const styles = StyleSheet.create({
    container:{
      borderWidth: 1,
      borderColor: props.palette.secondary,
      borderRadius: 5,
      height: 580,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30
    },
    image: {
      width: props.imgwidht,
      height: props.imgheight,
      resizeMode: "contain",
    },
  });

  return (
    <View style={styles.container}>
      {props.source && <Image source={props.source} style={styles.image}/>}
    </View>
  );
};

export default EXIFContainer;
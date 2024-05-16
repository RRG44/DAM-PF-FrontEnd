import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Title = (props) => {
  const text = props.text ? props.text : "Text";

  const styles = StyleSheet.create({
    title: {
      display: "flex",
      width: "100%",
      alignItems: "center",
      marginVertical: 10,
    },
    titletext: {
      fontSize: props.fontSize ? props.fontSize : 32,
      fontWeight: props.fontWeight ? props.fontWeight : "bold",
      color: props.palette.font ? props.palette.font : "black",
    },
  });

  return (
    <View style={styles.title}>
      <Text style={styles.titletext}>{text}</Text>
    </View>
  );
};

export default Title;

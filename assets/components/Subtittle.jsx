import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Subtitle = (props) => {
    const text = props.text ? props.text : "Text";
  
    const styles = StyleSheet.create({
      subtitle: {
        display: "flex",
        width: "100%",
        backgroundColor: props.palette.primary,
        marginVertical: 10,
      },
      titletext: {
        fontSize: props.fontSize ? props.fontSize : 20,
        fontWeight: "500",
        color: props.palette.font,
      },
    });
  
    return (
      <View style={styles.subtitle}>
        <Text style={styles.titletext}>{text}</Text>
      </View>
    );
  };

export default Subtitle;
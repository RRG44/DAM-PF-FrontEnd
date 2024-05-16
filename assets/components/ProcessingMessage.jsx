import React from "react";
import {Text, View, StyleSheet} from "react-native";

const ProcessingMessage = (props) => {
  const styles = StyleSheet.create({
    text: {
      color: props.palette.font,
      fontSize: 20,
      textAlign: "center",
    },
    message: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: '100%'
    },
  });

  return (
    <View style={styles.message}>
      <Text style={styles.text}>We are deleting the image's EXIF data, please wait a moment...</Text>
    </View>
  );
};

export default ProcessingMessage;
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Header = (props) => {
  const styles = StyleSheet.create({
    header: {
      display: "flex",
      width: "100%",
      height: 70,
      justifyContent: "center",
    },
    headerlogo: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    Slogo: {
      resizeMode: "contain",
      height: 34,
      width: 34,
    },
    Slogotext: {
      fontWeight: "bold",
      fontSize: 20,
      color: props.palette.font,
    },
  });

  return (
    <View style={styles.header}>
      <View style={styles.headerlogo}>
        <Image source={require("../images/Slogo.png")} style={styles.Slogo} />
        <Text style={styles.Slogotext}>secure surf</Text>
      </View>
    </View>
  );
};

export default Header;
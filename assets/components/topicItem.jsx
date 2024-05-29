import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import flecha from "../images/proximo.png"

const topicItem = props => {
  const styles = StyleSheet.create({
    productCard: {
      marginVertical: 10,
      paddingLeft: 10,
    },
    image: {
      height: 20,
      resizeMode: 'contain',
      tintColor: props.palette.font,
    },
    name: {
      fontSize: 20,
      fontWeight: '500',
      color: props.palette.font,
      width: "70%",
      paddingRight: 10,
    },
    button: {
      flexDirection: 'row',
      width: "100%",
      alignItems: 'center',
    },
    point: {
      fontSize: 20,
      fontWeight: '500',
      color: props.palette.font,
      paddingRight: 5,
    },
  });
  return (
    <View style={styles.productCard}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Detail", { topic: props.topic, navigation: props.navigation})} style={styles.button}>
            <Text style={styles.point}>-</Text>
            <Text style={styles.name}>{props.topic.title}</Text>
            <Image source={flecha} style={styles.image}/>
        </TouchableOpacity>
    </View>
  );
};


export default topicItem;
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import flecha from "../images/proximo.png"

const topicItem = props => {
  return (
    <View style={styles.productCard}>
      <View style={styles.text}>
        <Text style={styles.name}>{props.topic.title}</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Detail")}>
            <Text>Ver</Text><Image source={flecha}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    borderColor: "#ff0534",
    borderWidth: 1,
    width: "100%",
    height: 'auto',
    marginBottom: 20,
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: 'cover',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: "green",
  },
  des: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    fontSize: 12,
  }
});

export default topicItem;
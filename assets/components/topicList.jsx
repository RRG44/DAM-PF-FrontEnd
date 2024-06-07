import React from "react";
import { FlatList, StyleSheet, TextInput } from "react-native";
import TopicItem from "./topicItem.jsx";

const topicList = props => {
  return (
    <FlatList
      data={props.topics}
      renderItem={({ item }) => <TopicItem topic={item} navigation={props.navigation} palette={props.palette}/>}
      keyExtractor={(item) => item.id}
      style={styles.list}
      showsVerticalScrollIndicator={false}
      
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
  },
});

export default topicList;
import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const EXIFContainer = (props) => {
  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: props.palette.secondary,
      borderRadius: 5,
      height: 500,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 25,
      backgroundColor:
        props.errorServer === true ? props.palette.red : props.palette.primary,
    },
    image: {
      width: props.imgwidht,
      height: props.imgheight,
      resizeMode: "contain",
    },
    textError: {
      color: props.palette.secondary,
      fontSize: 20,
      textAlign: "center",
      width: "100%",
    },
    textEXIF: {
      color: props.palette.font,
      fontSize: 16,
      width: "100%",
      height: "100%",
      padding: 10,
    },
    textScroll: {
      width: "100%",
      height: "100%",
    },
  });

  return (
    <View style={styles.container}>
      {props.errorServer === true ? (
        <>
          <Text style={styles.textError}>
            {props.errorServerMessage}
            {"\n"}😢
          </Text>
        </>
      ) : props.seeingExif === true ? (
        <>
          <ScrollView style={styles.textScroll} nestedScrollEnabled={true}>
            <Text style={styles.textEXIF}>
              Deleted Metadata:{"\n"}
              {props.imageRecivedExif}
            </Text>
          </ScrollView>
        </>
      ) : (
        <>
          <Image source={props.source} style={styles.image} />
        </>
      )}
    </View>
  );
};

export default EXIFContainer;

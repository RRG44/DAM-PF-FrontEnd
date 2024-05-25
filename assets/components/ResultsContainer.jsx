import React from "react";
import { ScrollView, Text, StyleSheet, Image, Appearance, View } from "react-native";

const ResultsContainer = (props) => {
  const text = props.text ? props.text : '';
  const styles = props.style ? props.style : StyleSheet.create({
    scroll :
    {
      backgroundColor: props.palette.primary ? props.palette.primary : "#fff",
      width: props.width ? props.width : "100%",
      height: props.height ? props.height : 400,
      margin: props.margin ? props.margin : 0,
      marginBottom: 20,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: props.palette.secondary,
    },
    text:
    {
      fontSize: props.fontSize ? props.fontSize : 16,
      color: props.palette.font ? props.palette.font : 'black',
      padding: props.padding ? props.padding : 15,
      fontWeight: props.fontWeight ? props.fontWeight: 'normal',
    },
    loading:
    {
      position: 'relative',
      alignSelf: 'center',
      marginTop: props.height ? (props.height/2)-100 : 100,
    },
    loadingContainer:
    {
      justifyContent: 'center',
      flex: 1,
      alignItems: 'center',
    },
  }); 

  return (
    <ScrollView style = {styles.scroll} persistentScrollbar={true}>
      {text !== '' && <Text style= {styles.text}>{text}</Text>}
      {text === '' && 
        <Image 
          style={styles.loading}
          source={ Appearance.getColorScheme() == "light" ? require('../images/light/LoadingLight.gif') : require('../images/dark/LoadingDark.gif')}
        />
      }
    </ScrollView>
  );
};

export default ResultsContainer;
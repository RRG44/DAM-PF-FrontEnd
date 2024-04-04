import React, { useState, useEffect } from "react";
import { StyleSheet, View, useColorScheme, ScrollView } from "react-native";
import { lightColors, darkColors } from "./colors/colorsPalettes.jsx";
import { Button, EXIFContainer, Subtittle, Tittle } from "../components/index.jsx";
import iconlight from "../images/light/Img.png";
import icondark from "../images/dark/Img.png";

const CleanEXIF = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const colorScheme = useColorScheme();
  const palette = colorScheme === "dark" ? darkColors : lightColors;
  const Img = colorScheme === "dark" ? icondark : iconlight;

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      backgroundColor: palette.primary,
      width: "100%",
    },
    content: {
      width: "85%",
      alignSelf: "center",
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Tittle palette={palette} text="Clean EXIF" />
        <Subtittle palette={palette} text="Select an Image :" />
        <EXIFContainer
          palette={palette}
          source={isImageLoaded ? image : Img}
          imgwidht={isImageLoaded ? "100%" : 90}
          imgheight={isImageLoaded ? "100%" : 90}
        />
        {!isImageLoaded && (
          <>
            <Button palette={palette} color={palette.darkblue} text="Select Image" marginBottom={30}/>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default CleanEXIF;

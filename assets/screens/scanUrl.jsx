import React, { useState } from "react";
import { StyleSheet, Text, Alert, View, TextInput, TouchableWithoutFeedback, Keyboard, SafeAreaView, useColorScheme,Linking } from "react-native";
import { Button, ButtonMain, Title, Subtitle } from "../components/index.jsx";
import { useCameraPermissions } from "expo-camera/next.js";
import validator from "validator";
import { lightColors, darkColors } from "./colors/colorsPalettes.jsx";
import iconQR from "../images/qr.png"

export default function App({ navigation }) {
  const colorScheme = useColorScheme();
  const palette = colorScheme === "dark" ? darkColors : lightColors;

  const [cameraPermission, requestPermission] = useCameraPermissions();
  const [url, setUrl] = useState("");

  const checkPermissionsCamNavigate = async () => {
    if (cameraPermission?.status === 'granted') {
      navigation.navigate('Camera');
    } else {
      const permissionResponse = await requestPermission();
      if (permissionResponse.granted) {
        navigation.navigate('Camera');
      } else {
        Alert.alert(
          "Permisos necesarios",
          'Necesitas otorgar permisos para acceder a Scan URL. Por favor, ve a la configuración de tu dispositivo y otorga permisos a Cámara.',
          [{ text: "Ir a configuración", onPress: () => Linking.openSettings() }]
        );
      }
    }
  };

  function isValidURL() {
    if (
      validator.isURL(url, {
        require_protocol: true,
        require_valid_protocol: true,
        protocols: ["https", "http", "ftp"],
      })
    ) {
      navigation.navigate("Results", {
        url: url,
      });
      setUrl("");
    } else {
      Alert.alert("Oops...", "Seems like it's not a valid URL. Be sure to include protocols an all info. \nExample: \nhttps://www.example.com");
      setUrl("");
    }
  }

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      display: "flex",
      backgroundColor: palette.primary,
      width: "100%",
    },
    container: {
      width: '85%',
      alignSelf: 'center',
      alignItems: 'center'
    },
    input: {
      width: "100%",
      height: 55,
      paddingHorizontal: 15,
      borderWidth: 2,
      borderRadius: 5,
      fontSize: 16,
      borderColor: palette.secondary,
      marginVertical: 20,
      color: palette.font,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: palette.secondary,
      textAlign: "center",
      
    },
    text: {
      fontSize: 20,
      // margin: 10,
      fontWeight: "500",
    },
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Title palette={palette} text="Scan URL"/>
          <Subtitle palette={palette} text="Write an URL:" />
          <TextInput
            style={styles.input}
            multiline={false}
            maxLength={60}
            placeholder="Write a valid URL..."
            onChangeText={(text) => setUrl(text)}
            value={url}
            placeholderTextColor={palette.font}
          />
          <Button text="Test Url" onPress={isValidURL} palette={palette}/>
          <Subtitle palette={palette} text="Scan a QR code with the camera:" />
          <ButtonMain
            palette={palette}
            onPress={checkPermissionsCamNavigate}
            text="Scan a QR code"
            source={iconQR}
            height={250}
            width={250}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
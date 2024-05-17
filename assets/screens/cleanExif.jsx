import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  useColorScheme,
  ScrollView,
  Alert,
} from "react-native";
import { lightColors, darkColors } from "./colors/colorsPalettes.jsx";
import {
  Button,
  EXIFContainer,
  Subtitle,
  Title,
  ProcessingMessage,
} from "../components/index.jsx";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import iconExif from "../images/exif.png";
import giflight from "../images/light/LoadingLight.gif";
import gifdark from "../images/dark/LoadingDark.gif";

const CleanEXIF = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      scrollViewRef.scrollTo({ y: 0 });
    });
    return unsubscribe;
  }, [navigation]);

  const server = "http://148.220.212.218:8000";

  // Event handlers
  const [seeingExif, setSeeingExif] = useState(false);
  const [isImageSended, setIsImageSended] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageRecived, setIsImageRecived] = useState(false);
  const [isErrorFromServer, setIsErrorFromServer] = useState(false);

  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [imageRecived, setImageRecived] = useState(null);
  const [imageRecivedBase64, setImageRecivedBase64] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageRecivedName, setImageRecivedName] = useState("");
  const [imageRecivedExif, setImageRecivedExif] = useState("");
  const [imageRecivedFormat, setImageRecivedFormat] = useState("");
  const [errorServerMessage, setErrorServerMessage] = useState("");

  const colorScheme = useColorScheme();
  const palette = colorScheme === "dark" ? darkColors : lightColors;
  const gif = colorScheme === "dark" ? gifdark : giflight;

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

  const handleImagePicker = async () => {
    try {
      let res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
        allowsMultipleSelection: false,
        aspect: [1, 1],
        exif: true,
        base64: true,
        fileName: true,
      });
      if (!res.canceled) {
        setImage(res.assets[0].uri);
        setImageBase64(res.assets[0].base64);
        setImageName(res.assets[0].fileName);
        setSeeingExif(false);
        setIsImageRecived(false);
        setIsImageLoaded(true);
        setIsErrorFromServer(false);
      }
    } catch (error) {
      setError(error);
      alert(error);
    }
  };

  const handleGoBackHome = () => {
    setError(null);
    setImage(null);
    setImageBase64(null);
    setImageRecived(null);
    setImageName("");
    setIsImageSended(false);
    setIsImageLoaded(false);
    setIsImageRecived(false);
    setIsErrorFromServer(false);
    setErrorServerMessage("");
    setImageRecivedName("");
    setImageRecivedBase64(null);
    setImageRecivedExif("");
    setImageRecivedFormat("");
    setSeeingExif(false);
    navigation.navigate("Home");
  };

  const fetchDeleteEXIF = async () => {
    let controller = new AbortController();
    setTimeout(() => controller.abort(), 30000);

    const resp = await fetch(`${server}/clean_exif/`, {
      signal: controller.signal,
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: imageName, image: imageBase64 })
    });

    const json = await resp.json();
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    return json;
  };

  const handleDeleteEXIF = async () => {
    setIsErrorFromServer(false);
    setIsImageSended(true);
    try {
      let jsonResp = await fetchDeleteEXIF();
      if (jsonResp.error) {
        setIsErrorFromServer(true);
        setErrorServerMessage(jsonResp.error);
        setIsImageSended(false);
      } else {
        setImageRecivedName(jsonResp.name);
        setImageRecivedBase64(jsonResp.image);
        setImageRecivedExif(jsonResp.exif);

        let format = imageRecivedName.split(".").pop();

        setImageRecivedFormat(format);
        setImageRecived(`data:image/${format};base64,${imageRecivedBase64}`);
        setSeeingExif(false);
        setIsImageRecived(true);
        setIsImageSended(false);
      }
    } catch (error) {
      setIsErrorFromServer(true);
      setIsImageSended(false);
      if (error.name === "AbortError") {
        setErrorServerMessage("Something went wrong processing the image");
      } else {
        setErrorServerMessage(error.message);
      }
    }
  };

  

  const handleSaveImage = async () => {
    try {
      const caheDirectory = FileSystem.cacheDirectory;
      const temporalUri = `${caheDirectory}${imageRecivedName}`;
      await FileSystem.writeAsStringAsync(temporalUri, imageRecivedBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      let asset = await MediaLibrary.createAssetAsync(temporalUri);

      await FileSystem.deleteAsync(temporalUri);
      wtf = await FileSystem.getContentUriAsync(temporalUri);
      console.log(wtf);
      const album = await MediaLibrary.getAlbumAsync("CleanEXIF");
      if(!album) {
        await MediaLibrary.createAlbumAsync("CleanEXIF", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }


      if (asset) {
        Alert.alert(
          "Image Saved",
          "The image has been saved in the CleanEXIF album",
          [
            {
              text: "OK",
            },
          ]
        );
      }

    } catch (error) {
      setError(error);
      alert(error);
      console.log(error);
    }
  };

  let subtittleText = "";
  if (!isImageLoaded) {
    subtittleText = "Select an Image:";
  } else if (!isImageSended && !isErrorFromServer && !isImageRecived) {
    subtittleText = "Image Selected:";
  } else if (isImageSended) {
    subtittleText = "Processing Image...";
  } else if (isErrorFromServer) {
    subtittleText = "Error Deleting EXIF Data:";
  } else if (isImageRecived) {
    subtittleText = "Image Ready:";
  }

  let source = null;
  if (!isImageLoaded) {
    source = iconExif;
  } else if (isImageLoaded && !isImageSended) {
    source = { uri: image };
  } else if (isImageLoaded && isImageSended) {
    source = gif;
  } else if (isImageRecived) {
    source = imageRecived;
  }

  let imgWidhtHeight = null;
  if (
    (!isImageLoaded && !isImageRecived) ||
    (isImageLoaded && !isImageRecived && isImageSended)
  ) {
    imgWidhtHeight = 150;
  } else {
    imgWidhtHeight = "100%";
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        ref={(ref) => {
          scrollViewRef = ref;
        }}
      >
        <Title palette={palette} text="Clean EXIF" />
        <Subtitle palette={palette} text={subtittleText} />
        <EXIFContainer
          palette={palette}
          source={source}
          imgwidht={imgWidhtHeight}
          imgheight={imgWidhtHeight}
          errorServer={isErrorFromServer}
          errorServerMessage={errorServerMessage}
          seeingExif={seeingExif}
          imageRecivedExif={imageRecivedExif}
          tintColor={(imgWidhtHeight === 150 && !isImageLoaded) ? palette.secondary : null}
        />
        {!isImageLoaded ? (
          <>
            <Button
              palette={palette}
              color={palette.darkblue}
              text="Select Image"
              marginBottom={25}
              onPress={handleImagePicker}
            />
          </>
        ) : isImageSended ? (
          <>
            <ProcessingMessage palette={palette} />
          </>
        ) : (
          <>
            {!isImageSended && !isImageRecived && (
              <>
                <Button
                  palette={palette}
                  color={palette.lightblue}
                  text={isErrorFromServer ? "Try Again" : "Delete EXIF"}
                  marginBottom={50}
                  onPress={handleDeleteEXIF}
                />
              </>
            )}
            {isImageRecived && (
              <>
                <Button
                  palette={palette}
                  color={palette.lightblue}
                  text="Save Clean Image"
                  marginBottom={50}
                  onPress={handleSaveImage}
                />
                <Button
                  palette={palette}
                  color={palette.darkblue}
                  text={seeingExif ? "See Image" : "See Deleted Data"}
                  marginBottom={25}
                  onPress={() => setSeeingExif(!seeingExif)}
                />
              </>
            )}
            <Button
              palette={palette}
              color={palette.darkblue}
              text="Select Another Image"
              marginBottom={25}
              onPress={handleImagePicker}
            />
            <Button
              palette={palette}
              color={palette.darkblue}
              text={isImageRecived ? "Go Back Home" : "Cancel and Go Back Home"}
              marginBottom={25}
              onPress={handleGoBackHome}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default CleanEXIF;
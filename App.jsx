import "react-native-gesture-handler"; // ! NEEDS TO BE HERE AT THE BEGGINING DO NOT MOVE OR DELETE!!!!!! 😡
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { lightColors, darkColors } from "./assets/screens/colors/colorsPalettes.jsx";
import { useColorScheme, View, Text, Image, Alert, Linking, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home, Camera, UrlResults, UrlScan, Academy, CleanExif, SplashScreen, Detail } from "./assets/screens/index.jsx";
import { useCameraPermissions } from "expo-camera/next.js";
import * as MediaLibrary from "expo-media-library"; //npm install expo-media-library
import { Header } from "./assets/components/index.jsx";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const requestPermissionCam = async () => {
  try {
    const [permission, requestPermission] = useCameraPermissions();
    useEffect(() => {
      (async () => {
        await requestPermission();
      })();
    }, []);
    console.log("Camera permission ", permission?.status);
    return permission?.status;
  } catch (error) {
    console.error("Error requesting camera permission:", error);
  }
};

const requestPermissionFile = async () => {
  try {
    const [permissionResponse, requestPermission] =
      MediaLibrary.usePermissions();
    useEffect(() => {
      (async () => {
        await requestPermission();
      })();
    }, []);
    console.log("File permission ", permissionResponse?.status);
    return permissionResponse?.status
  } catch (error) {
    console.error("Error requesting file permission:", error);
  }
};

const PermissionAll = async () => {
  try {
    const [permissionResponse, requestPermission] =
      MediaLibrary.usePermissions();
    useEffect(() => {
      (async () => {
        await requestPermission();
      })();
    }, []);
    console.log("File permission ", permissionResponse?.status);
    return permissionResponse?.status
  } catch (error) {
    console.error("Error requesting file permission:", error);
  }
};

const App = () => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [filePermission, requestFilePermission] = MediaLibrary.usePermissions();
  const [appIsReady, setAppIsReady] = useState(false);
  const colorScheme = useColorScheme();
  const palette = colorScheme === "dark" ? darkColors : lightColors;

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const camPermission = cameraPermission?.status === 'granted';
        const filePermissionStatus = filePermission?.status === 'granted';

        console.log("Camera permission:", cameraPermission?.status);
        console.log("File permission:", filePermission?.status);

        if (camPermission && filePermissionStatus) {
          setAppIsReady(true);
        } else {
          Alert.alert(
            "Permisos necesarios",
            'Necesitas otorgar permisos para continuar. Por favor, ve a la configuración de tu dispositivo y otorga permisos de Cámara y Multimedia.',
            [{ text: "Ir a configuración", onPress: () => Linking.openSettings() }]
          );
        }
      } catch (e) {
        console.warn(e);
      }
    }

    if (!cameraPermission || cameraPermission.status !== 'granted') {
      requestCameraPermission();
    }
    if (!filePermission || filePermission.status !== 'granted') {
      requestFilePermission();
    }

    const intervalId = setInterval(() => {
      const camPermission = cameraPermission?.status === 'granted';
      const filePermissionStatus = filePermission?.status === 'granted';

      console.log("Revisando permisos...");
      console.log("Camera permission:", cameraPermission?.status);
      console.log("File permission:", filePermission?.status);

      if (camPermission && filePermissionStatus) {
        setAppIsReady(true);
        clearInterval(intervalId); // Clear the interval once permissions are granted
      } else {
        prepare();
      }
    }, 2000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [cameraPermission, filePermission]);

  return (
    <SafeAreaView style={{ backgroundColor: palette.primary, flex: 1 }}>
      {appIsReady ? (
        <>
          <NavigationContainer>
            <StatusBar
              barStyle={
                colorScheme === "light" ? "dark-content" : "light-content"
              }
              backgroundColor={palette.primary}
            />
            <Drawer.Navigator
              initialRouteName="Home"
              backBehavior="initialRouteName"
              screenOptions={{
                headerTitle: () => (
                  <Header palette={palette} colorScheme={colorScheme} />
                ),
                headerStyle: {
                  backgroundColor: palette.primary,
                  height: 100,
                },
                headerTintColor: palette.secondary,
                headerTitleAlign: "center",
                
                drawerStyle: {
                  backgroundColor: palette.primary,
                  width: 240,
                },
                // drawerActiveTintColor: palette.secondary,zz
                drawerInactiveTintColor: palette.secondary,
                // drawerActiveBackgroundColor: '#50A0FF66',
                drawerAllowFontScaling: true,
              }}
            >
              <Drawer.Screen name="Home" component={Home} />
              <Drawer.Screen name="Scan Url" component={UrlScan} />
              <Drawer.Screen name="Clean Exif" component={CleanExif} />
              <Drawer.Screen name="Academy" component={Academy} />
              {/* This screens are not shown in drawer, but must be navigable  */}
              <Drawer.Screen name="Results" component={UrlResults} options={{ drawerLabel: () => null, drawerItemStyle: { display: 'none' } }}/>
              <Drawer.Screen name="Camera" component={Camera} options={{ drawerLabel: () => null, drawerItemStyle: { display: 'none' }, headerShown: false }}/>
              <Drawer.Screen name="Detail" component={Detail} options={{ drawerLabel: () => null, drawerItemStyle: { display: 'none' } }}/>
            </Drawer.Navigator>
          </NavigationContainer>
        </>
      ) : (
        <SplashScreen palette={palette} colorScheme={colorScheme}/>
      )}
    </SafeAreaView>
  );
};

export default App;

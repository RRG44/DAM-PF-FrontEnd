import { CameraView, useCameraPermissions, Camera } from 'expo-camera/next';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, Alert, View, Image, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import validator from 'validator';

export default function App({navigation}) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions(false);
  const [qrDetected, setQrDetected] = useState(false);
  const [torch, setTorch] = useState(false)

  // useEffect(() => {
  //   (async () => {
  //     await requestPermission();
  //     permission.canAskAgain = true
  //   })();
  // }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Scan Url');
      return true;
    });

    return () => BackHandler.remove; // Cleanup on unmount
  }, [navigation]);

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function readQr (url) {
    if (!qrDetected && isValidURL(url.data)) {
      setQrDetected(true);
      Alert.alert('QR',  'url: '+ url.data, [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {setQrDetected(false)}
        }, 
        {
          text: 'Continue',
          onPress: () => {
            navigation.navigate('Results', {
              url : url.data
            });
            setQrDetected(false)}
        }], {cancelable: false})
    }
  };

  function changeTorchState (){
    setTorch(!torch);
  };

  function goBack(){
    navigation.navigate('Scan Url')
  };

  function isValidURL(url){

    if (!validator.isURL(url,{ require_valid_protocol : true, protocols: ['http','https','ftp']})){
      return false;
    }
    return true;
  };

  return (
    <SafeAreaView style = {styles.safeArea}>
      <CameraView 
        style = {styles.camera} 
        enableTorch = {torch} 
        facing={facing}
        onBarcodeScanned={(BarCodeScanningResult)=> readQr(BarCodeScanningResult)}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
>
        <View style = {styles.cameraContainer}>

          <View style = {styles.btnContainer}>
            <TouchableOpacity style = {[styles.btn, {width: 60, height: 60}]}  onPress={goBack}>
              <Image 
                style = {[styles.btnImg, {width: 30, height: 30}]}
                source={require('../images/close.png')}/>
            </TouchableOpacity>
          </View>

          <View>
          </View>

          <View style = {styles.btnContainer}>
            
            <TouchableOpacity style = {styles.btn}  onPress={changeTorchState}>
              <Image 
                style = {styles.btnImg}
                source={torch ? require('../images/bulb-off.png') : require('../images/bulb-on.png')}/>
            </TouchableOpacity>
            
            
            <TouchableOpacity style = {styles.btn}  onPress={toggleCameraFacing}>
              <Image 
                style = {styles.btnImg}
                source={require('../images/change.png')}/>
            </TouchableOpacity>
          </View>

        </View>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn:
  {
    backgroundColor: '#00000055',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  safeArea:
  {
    flex: 1,
    backgroundColor : '#fff'    
  },
  cameraContainer:
  {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  camera:
  {
    flex: 1,
  },
  qrImg:
  {
    width: 300,
    height: 300,
  },
  btnImg:
  {
    width: 50,
    height: 50,
    tintColor: 'white'
  },
  btnContainer:
  {
    alignItems: 'center', 
    justifyContent: 'space-between', 
    flexDirection: 'row', 
    width: '85%', 
    marginVertical: 30,
  },
});
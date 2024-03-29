import { CameraView, useCameraPermissions, Camera } from 'expo-camera/next';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, Alert, View, Image, BackHandler } from 'react-native';

export default function App({navigation}) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions(false);
  const [qrDetected, setQrDetected] = useState(false);
  const [torch, setTorch] = useState(false)

  useEffect(() => {
    (async () => {
      await requestPermission();
      permission.canAskAgain = true
    })();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Scan Url');
      return true;
    });

    return () => BackHandler.remove(); // Cleanup on unmount
  }, [navigation]);

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function readQr (url) {
    if (!qrDetected) {
      setQrDetected(true);
      Alert.alert('QR',  'url: '+ url.data, [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {setQrDetected(false)}
        }, 
        {
          text: 'Continue',
          onPress: () => {setQrDetected(false)}
        }], {cancelable: false})
    }
  };

  function changeTorchState (){
    setTorch(!torch);
  };

  function goBack(){
    navigation.navigate('Scan Url')
  };

  return (
    <View style = {{height : '100%'}}>
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

          <View style = {{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '85%', marginTop: '15%'}}>
            <TouchableOpacity style = {[styles.btn, {width: 60, height: 60}]}  onPress={goBack}>
              <Image 
                style = {[styles.btnImg, {width: 30, height: 30}]}
                source={require('../images/close.png')}/>
            </TouchableOpacity>
          </View>

          <View>
          </View>

          <View style = {{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '85%'}}>
            
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
    </View>
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
  cameraContainer:
  {
    height: '95%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  camera:
  {
    height: '100%',
    height: '100%',
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
  }
});
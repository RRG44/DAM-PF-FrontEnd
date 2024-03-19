import { CameraView, useCameraPermissions, Camera } from 'expo-camera/next';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, Alert, View } from 'react-native';

export default function App() {
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

  return (
    <View style = {{height : '100%'}}>
      <CameraView style = {styles.camera} enableTorch = {torch} facing={facing} onBarcodeScanned={(BarCodeScanningResult)=> readQr(BarCodeScanningResult)}>
        <View style = {styles.cameraContainer}>
          <View></View>
          <View></View>
          <View>
            <TouchableOpacity style = {styles.btn}  onPress={toggleCameraFacing}>
              <Text >Flip Camera</Text>
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
    backgroundColor: 'white',
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cameraContainer:
  {
    height: '95%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  camera:
  {
    height: '100%'
  },
});
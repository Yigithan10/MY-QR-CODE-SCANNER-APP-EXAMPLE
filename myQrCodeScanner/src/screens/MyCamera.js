import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Linking, Button, View, BackHandler } from 'react-native';
import { useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';

const MyCamera = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  const ExitApp = () => {
    BackHandler.exitApp();
  };

  function handleExitButton() {
    ExitApp();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleExitButton);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleExitButton,
      );
    };
  }, []);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  return (
    device != null &&
    hasPermission && (
      <View>
        <View style={styles.camera}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
        </View>
        <View style={styles.card}>
          {barcodes.map((barcode, idx) => (
            <View key={idx} style={styles.card2}>
              <Button style={styles.button} title='GO TO URL' onPress={() => {
                Linking.openURL(barcode.displayValue);
              }} />
            </View>
          ))}
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  camera: {
    width: '100%',
    height: '50%',
    backgroundColor: '#D1F2EB',
  },
  card: {
    width: '100%',
    height: '50%',
    backgroundColor: '#D1F2EB',
  },
  card2: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D1F2EB',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    borderRadius: 20
  }
});

export default MyCamera;
import React from "react";
import { StyleSheet } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import Icon from 'react-native-vector-icons/Feather';
import { Container, Body, CameraConainer, Button } from './styles';

const ScanQrCode = ({ success, onSuccess, showScan, closeScan }) => {
  return (
    <Container
      transparent={false}
      visible={showScan}
      animationType="slide"
    >
      <Body>
        <QRCodeScanner
          onRead={onSuccess}
          showMarker={true}
          checkAndroid6Permissions={true}
          ref={(elem) => { }}
          cameraStyle={styles.cameraContainer}
        />
        <Button onPress={closeScan}>
          <Icon name="x-circle" size={60} color="#fff" />
        </Button>
      </Body>
    </Container>
  );
}

export default ScanQrCode;

const styles = StyleSheet.create({
  cameraContainer: {
    height: '100%'
  }
});
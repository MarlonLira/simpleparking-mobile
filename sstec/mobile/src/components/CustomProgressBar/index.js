import React from 'react';
import {
  View,
  Text,
  Modal,
  ActivityIndicator,
} from 'react-native';


 const CustomProgressBar = (props) => (
  <Modal onRequestClose={() => null} visible={props.visible}>
    <View style={{ flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
        <Text style={{ fontSize: 15, fontWeight: '200' }}>Carregando</Text>
        <ActivityIndicator size="large" color="#59578e" />
      </View>
    </View>
  </Modal>
)

export default CustomProgressBar;
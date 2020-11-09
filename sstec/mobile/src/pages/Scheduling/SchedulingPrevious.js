import React from 'react';
import {
  View, 
  Text,
  StyleSheet 
} from 'react-native';
import StatusBarComponent from '../../components/StatusBar';

const SchedulingPrevious = () => {
  return (
    <View style={styles.container}>
      <StatusBarComponent />
      <Text>SchedulingPrevious</Text>
    </View>
  );
}

export default SchedulingPrevious;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
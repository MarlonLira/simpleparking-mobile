import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Creators as SchedulingActions } from '../../store/ducks/scheduling';

const Scheduling = ({ scheduling, add}) => {
  return (
    <View style={styles.container}>
      <Text>Scheduling</Text>
    </View>
  )
};

export default Scheduling;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
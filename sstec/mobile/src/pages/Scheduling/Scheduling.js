import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as SchedulingActions } from '../../store/ducks/scheduling';

const Scheduling = ({ scheduling, add}) => {
  return (
    <View style={styles.container}>
      {scheduling.map(
        schedulings => (
          <Text key={schedulings.id}>{schedulings.text}</Text>
        ))} 
      <Button 
        onPress={add} title="Adicionar" />
    </View>
  )
}

const mapStateToProps = state => ({
  scheduling: state,
})

const mapDispatchToProps =  dispatch => 
  bindActionCreators(SchedulingActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Scheduling);

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
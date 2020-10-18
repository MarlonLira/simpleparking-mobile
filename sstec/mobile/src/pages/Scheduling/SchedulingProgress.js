import React, { useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import ListScheduling from '../../components/ListScheduling';
import { Creators as SchedulingActions } from '../../store/ducks/scheduling';
import { AuthContext } from '../../contexts/auth';

import { useDispatch, useSelector } from 'react-redux';


const SchedulingProgress = () => {

  const { profile, scheduling } = useSelector(state => state);
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SchedulingActions.schedulingRequest(user.id));
  }, [])

  const RenderList = () => {

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={scheduling.schedulings.reverse()}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ListScheduling
            data={item}
          />
        )}
      >
      </FlatList>
    )
  };

  return (
    <View style={styles.container}>
      {scheduling.request ?
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='#59578e' />
        </View>
        :
        <View>
          <RenderList />
        </View>
      }
    </View>
  );
}

export default SchedulingProgress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
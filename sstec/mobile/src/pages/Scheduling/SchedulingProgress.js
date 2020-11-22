import React, { useEffect, useContext, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import ListScheduling from '../../components/ListScheduling';
import { Creators as SchedulingActions } from '../../store/ducks/scheduling';
import { AuthContext } from '../../contexts/auth';
import { useDispatch, useSelector } from 'react-redux';
import ScanQrCode from '../../components/ScanQrCode';
import DialogComponent from '../../components/Dialog';
import Button from '../../components/Button';
import CustomProgressBar from '../../components/CustomProgressBar';
import { Decrypt } from '../../utils/crypto';

const SchedulingProgress = () => {

  const [showScan, setShowScan] = useState(false);
  const [schedulingData, setSchedulingData] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogError, setShowDialogError] = useState(false);

  const { profile, scheduling } = useSelector(state => state);
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SchedulingActions.schedulingRequest(user.id));
  }, []);

  useEffect(() => {
    console.log(scheduling.successEdit);
    if (scheduling.successEdit) {
      setShowDialog(true);
      dispatch(SchedulingActions.schedulingRequest(user.id));
    }
  }, [scheduling.successEdit])

  const onSuccessScan = async (e) => {
    setShowScan(false);
    if (e.data == schedulingData.parkingId) {

      const data = {
        id: schedulingData.id,
        status: 'PD',
        userName: schedulingData.userName,
        cardNumber: schedulingData.cardNumber,
        vehiclePlate: schedulingData.vehiclePlate,
        vehicleType: schedulingData.vehicleType,
        value: schedulingData.value,
        date: schedulingData.date,
        avaliableTime: schedulingData.avaliableTime,
        unavailableTime: scheduling.unavailableTime,
        userId: scheduling.userId,
        vehicleId: scheduling.vehicleId,
        cardId: scheduling.cardId,
        parkingId: scheduling.scheduling,
        parkingSpaceId: scheduling.parkingSpaceId
      }

      dispatch(SchedulingActions.schedulingEdit(data));
      setShowScan(false);
    } else {
      setShowDialogError(true);
    };
  };

  const handleActivate = (item) => {
    setShowScan(true);
    setSchedulingData(item);
  }

  const RenderList = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={scheduling.schedulings}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ListScheduling
            data={item}
            handleActivate={() => handleActivate(item)}
          />
        )}
      >
      </FlatList>
    )
  };

  const RendeBody = () => {
    return (
      <Button
        text="OK"
        onPress={handleButton}
      />
    );
  };

  const handleButton = () => {
    setShowDialog(false);
  }

  return (
    <View style={styles.container}>

      <CustomProgressBar visible={scheduling.loadingEdit} />

      {scheduling.request ?
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='#59578e' />
        </View>
        :
        <View>
          <RenderList />
          
          <ScanQrCode
            onSuccess={onSuccessScan}
            showScan={showScan}
            closeScan={() => setShowScan(false)}
          />

          <DialogComponent
            visible={showDialog}
            title="Seu agendamento está ativo!"
            description="Confirmamos seu agendamento e você já pode estacionar o seu veículo."
            body={<RendeBody />}
          />

          <DialogComponent
            visible={showDialogError}
            title="Não existe agendamento para esse estacionamento."
            description="Verifique seus agendamentos e tente novamente."
            body={
              <Button
                text="OK"
                onPress={() => setShowDialogError(false)}
              />}
          />
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
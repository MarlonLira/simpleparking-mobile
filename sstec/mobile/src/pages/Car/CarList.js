import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Creators as CarActions } from '../../store/ducks/car';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from "react-native-dialog";
import CustomProgressBar from '../../components/CustomProgressBar';
import ListCar from '../../components/ListCar';
import { useNavigation } from '@react-navigation/native';

const CarList = () => {

  const [visible, setVisible] = useState(false);
  const [idCar, setIdCar] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { profile, car } = useSelector(state => state);

  useEffect(() => {
    dispatch(CarActions.carRequest(profile.dataUser.id));
  }, [])

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const onPressDelete = () => {
    dispatch(CarActions.carDelete(idCar));
    hideDialog();
  };

  const onPressPut = (item) => {
    dispatch(CarActions.carEdit());
    navigation.navigate('Car', {
      title: 'Editar veículo',
      item
    });
  };

  const RenderDisplayDialog = () => {

    return (
      <View style={{ alignItems: "center" }}>
        <Dialog.Container visible={visible} >
          <Dialog.Title>Você quer mesmo excluir este veículo?</Dialog.Title>
          <Dialog.Description>
            Todos os dados salvos serão apagados do aplicativo.
          </Dialog.Description>
          <TouchableOpacity style={styles.commandButton} activeOpacity={0.5} onPress={onPressDelete}>
            <Text style={styles.panelButtonTitle}>Apagar veículo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancel} activeOpacity={0.5} onPress={hideDialog}>
            <Text style={styles.textSign}>Agora não</Text>
          </TouchableOpacity>
        </Dialog.Container>
      </View>
    );
  };


  const RenderList = () => {
    var list = [];

    !car.cars ? [] : car.cars.forEach(element => {
      let _cars = {};

      _cars = {
        id: element.id,
        status: element.status,
        model: element.model,
        color: element.color,
        type: element.type,
        licensePlate: element.licensePlate,
      };

      list.push(_cars);

    });

    return (
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={list}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ListCar
            data={item}
            onPressDelete={showDialog}
            onPressPut={() => onPressPut(item)}
            setIdCard={setIdCar(item.id)} />
        )}
      >
      </FlatList>
    );
  }

  return (
    <View style={styles.container}>
      {car.onDelete ? <CustomProgressBar /> : null}
      { car.loadingData ?
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='#59578e' />
        </View>
        :
        <View>
          <RenderDisplayDialog />
          <RenderList />
        </View>
      }

    </View>
  )
}

export default CarList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commandButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#59578e',
    alignItems: 'center',
    marginTop: 10,
  },
  cancel: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#59578e',
    borderWidth: 1,
    marginTop: 15
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#59578e'
  },
})
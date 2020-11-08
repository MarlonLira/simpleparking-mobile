import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CarActions } from '../../store/ducks/car';

import { Picker } from '@react-native-community/picker';
import CustomProgressBar from '../../components/CustomProgressBar';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { TextInputPattern, typesIcon } from '../../components/TextInput';
import ButtonComponent from '../../components/Button';

const Car = ({ route }) => {

  const [idCar, setIdCar] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [type, setType] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [types, setTypes] = useState([
    { value: '', label: '' },
    { value: "CAR", label: "Carro" },
    { value: "MOTOCYCLE", label: "Moto" }
  ]);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  var allTypes = types.map((value, key) => {
    return <Picker.Item key={key} value={value.value} label={value.label} />
  });

  const { profile, car } = useSelector(state => state);

  const validateForm = () => {
    if (model != '' && color != '' && type != '' && licensePlate != '' && licensePlate.length == 7) {
      setDisabled(false);
    } else {
      setDisabled(true);
    };
  };

  useEffect(() => {
    validateForm();
  }, [model, color, type, licensePlate]);

  useEffect(() => {
    if (car.goBack) {
      navigation.goBack();
    };
  }, [car.goBack]);

  useEffect(() => {
    if (typeof route.params !== 'undefined') {
      setModel(route.params.item.model);
      setColor(route.params.item.color);
      setType(route.params.item.type);
      setLicensePlate(route.params.item.licensePlate);
      setIdCar(route.params.item.id);
    }
  }, []);

  useEffect(() => {
    if (!isFocused && car.onEdit) {
      dispatch(CarActions.carOffEdit());
    }
  }, [isFocused])

  const handleSubmit = () => {
    const values = {
      model: model,
      color: color,
      type: type,
      licensePlate: licensePlate,
      userId: profile.dataUser.id,
      id: idCar
    };

    !car.onEdit ?
      dispatch(CarActions.carInclude(values)) :
      dispatch(CarActions.carEditItem(values));
  };

  return (
    <View style={styles.container}>

      <CustomProgressBar visible={car.loading} />

      <View style={styles.area}>

        <TextInputPattern
          icon="plus-square"
          typeIcon={typesIcon.Feather}
          value={model}
          onChangeText={text => { setModel(text) }}
          placeholder='Modelo'
          autoCorrect={false}
        />

        <TextInputPattern
          icon="square"
          typeIcon={typesIcon.Feather}
          value={color}
          onChangeText={text => { setColor(text) }}
          placeholder='Cor'
          autoCorrect={false}
        />

        <View style={styles.actionPinker}>

          <Text style={{ color: '#666666' }}>Tipo</Text>

          <Picker
            selectedValue={type}
            onValueChange={(itemValue, itemIndex) => setType(itemValue)}
            mode='dropdown'
            style={{ width: 350, marginLeft: 10 }}
          >
            {allTypes}
          </Picker>
        </View>

        <TextInputPattern
          icon="clipboard-outline"
          typeIcon={typesIcon.Ionic}
          value={licensePlate}
          onChangeText={text => { setLicensePlate(text) }}
          placeholder='Placa'
          autoCorrect={false}
          maxLength={7}
        />

        <View style={{ marginTop: 10, marginBottom: 30 }}>
          <ButtonComponent text="Salvar" onPress={handleSubmit} disabled={disabled}  />
        </View>

      </View>
    </View>
  );
};

export default Car;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  area: {
    padding: 20,
  },
  actionPinker: {
    marginTop: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
});
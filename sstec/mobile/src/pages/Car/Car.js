import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CarActions } from '../../store/ducks/car';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionic from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-community/picker';
import CustomProgressBar from '../../components/CustomProgressBar';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

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

        <View style={styles.action}>
          <Feather name="plus-square" size={20} color="#59578e" />
          <TextInput
            value={model}
            onChangeText={text => { setModel(text) }}
            placeholder='Modelo'
            placeholderTextColor='#666666'
            style={styles.textInput}
            autoCorrect={false}
          />
        </View>

        <View style={styles.action}>
          <Feather name="square" size={20} color="#59578e" />
          <TextInput
            value={color}
            onChangeText={text => { setColor(text) }}
            placeholder='Cor'
            placeholderTextColor='#666666'
            style={styles.textInput}
            autoCorrect={false}
          />
        </View>

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

        <View style={styles.action}>
          <Ionic name="clipboard-outline" size={20} color="#59578e" />
          <TextInput
            value={licensePlate}
            onChangeText={text => { setLicensePlate(text) }}
            placeholder='Placa'
            placeholderTextColor='#666666'
            style={styles.textInput}
            autoCorrect={false}
            maxLength={7}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          disabled={disabled}
          style={[styles.commandButton, disabled ? { backgroundColor: '#dddde8' } : { backgroundColor: '#59578e' }]}
          onPress={handleSubmit}>

          <Text style={styles.panelButtonTitle}> Salvar </Text>

        </TouchableOpacity>

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
  action: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
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
  textInput: {
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#59578e',
    width: '100%'
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  commandButton: {
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
});
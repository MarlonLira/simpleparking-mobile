import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { InputMask, Type, RemoveMask } from '../../components/InputMask';
import { getCardFlag } from '../../utils/Functions';
import * as Animatable from 'react-native-animatable';

import { useSelector, useDispatch } from 'react-redux';
import { Creators as CreditCardActions } from '../../store/ducks/creditCard';
import CustomProgressBar from '../../components/CustomProgressBar';

import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';


const CreditCard = ({ route }) => {

  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [security, setSecurity] = useState('');
  const [holder, setHolder] = useState('');
  const [idCard, setIdCard] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [flag, setFlag] = useState(null);
  const [error, setError] = useState(false);


  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { profile } = useSelector(state => state);
  const { creditCard } = useSelector(state => state);
  const isFocused = useIsFocused();

  const validateForm = () => {
    if (number != '' && number.length >= 13 && expiry != '' && security != '' && holder != '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    validateForm();
  }, [number, expiry, security, holder]);

  useEffect(() => {
    if (number != '') {
      validadeNumber();
    } else {
      setError(false);
    }
  }, [number]);

  useEffect(() => {
    if (creditCard.goBack) {
      navigation.goBack();
    };
  }, [creditCard.goBack]);

  useEffect(() => {
    if (typeof route.params !== 'undefined') {
      setNumber(`${route.params.item.flag.toUpperCase()} *** ${route.params.item.number}`);
      setExpiry(route.params.item.expirationDate);
      setHolder(route.params.item.holder);
      setIdCard(route.params.item.id);
    };
  }, []);

  useEffect(() => {
    if (!isFocused && creditCard.onEdit) {
      dispatch(CreditCardActions.creditCardOfEdit());
    }
  }, [isFocused]);

  const validadeNumber = () => {

    if (flag) {
      setError(false);
    } else {
      setError(true);
    };

  };

  const handleSubmit = () => {
    var values = {};

    if (!creditCard.onEdit) {
      values = {
        number: RemoveMask(number, Type.CARD),
        type: "credit",
        flag: flag,
      }
    };

    values = {
      ...values,
      holder: holder,
      expirationDate: expiry,
      secureCode: security,
      userId: profile.dataUser.id,
      id: idCard,
    };

    !creditCard.onEdit ?
      dispatch(CreditCardActions.creditCardInclude(values)) :
      dispatch(CreditCardActions.creditCardEditItem(values));
  };

  return (
    <View style={styles.container}>

      <CustomProgressBar visible={creditCard.loading} />

      <View style={styles.area}>
        <View style={[styles.action, { width: '90%' }]}>
          <FontAwesome name="credit-card" size={20} color="#59578e" />
          {!creditCard.onEdit ?
            <InputMask
              type={Type.CARD}
              value={number}
              onChangeText={text => { setNumber(text); setFlag(getCardFlag(text)); }}
              placeholder='Número'
              placeholderTextColor='#666666'
              keyboardType='number-pad'
              style={styles.textInput}
              autoCorrect={false}
              maxLength={19}
            />
            :
            <TextInput
              value={number}
              onChangeText={text => { setNumber(text) }}
              placeholder='Número'
              placeholderTextColor='#666666'
              style={[styles.textInput, { fontWeight: "bold" }]}
              autoCorrect={false}
              editable={false}
            />
          }
        </View>

        {error && !creditCard.onEdit ?
          <Animatable.View style={{
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: 5,
          }}
            animation={"fadeInLeft"}
            duration={500}>
            <FontAwesome name="times" size={17} color="#FF0000" />
            <Text style={styles.errorMsg}>Insira um número válido</Text>
          </Animatable.View>
          : null
        }

        <View style={styles.line}>
          <View style={[styles.action, { width: '50%', marginRight: '10%' }]}>
            <Icon name="calendar" size={20} color="#59578e" />
            <InputMask
              type={Type.DATE}
              value={expiry}
              onChangeText={text => { setExpiry(text); }}
              placeholder='Validade'
              placeholderTextColor='#666666'
              keyboardType='number-pad'
              style={styles.textInput}
              autoCorrect={false}
              maxLength={5}
            />
          </View >
          <View style={[styles.action, { width: '40%' }]}>
            <Feather name="lock" color="#59578e" size={20} />
            <InputMask
              type={Type.NUMBER}
              value={security}
              onChangeText={text => { setSecurity(text); }}
              placeholder='CVV'
              placeholderTextColor='#666666'
              keyboardType='numeric'
              style={styles.textInput}
              autoCorrect={false}
              maxLength={3}
            />
          </View>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} color="#59578e" />
          <TextInput
            value={holder}
            onChangeText={text => { setHolder(text) }}
            placeholder='Nome completo'
            placeholderTextColor='#666666'
            style={styles.textInput}
            autoCorrect={false}
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
  )
};

export default CreditCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  area: {
    padding: 20,
  },
  textInput: {
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#59578e',
    width: '100%'
  },
  text_footer: {
    color: '#59578e',
    fontSize: 18,
    marginTop: 35,
    marginBottom: 10
  },
  action: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  commandButton: {
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  line: {
    flexDirection: 'row',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    paddingLeft: 10,
  },
});
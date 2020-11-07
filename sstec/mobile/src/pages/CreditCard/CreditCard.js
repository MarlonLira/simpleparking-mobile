import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInputPattern, TextInputMask, typesIcon, Type, RemoveMask } from '../../components/TextInput';
import ButtonComponent from '../../components/Button';
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
        <View style={{ width: '90%' }}>
          {!creditCard.onEdit ?
            <TextInputMask
              icon="credit-card"
              typeIcon={typesIcon.FontAwesome}
              typeMask={Type.CARD}
              value={number}
              onChangeText={text => { setNumber(text); setFlag(getCardFlag(text)); }}
              placeholder='Número'
              keyboardType='number-pad'
              autoCorrect={false}
              maxLength={19}
            />
            :
            <TextInputPattern
              value={number}
              onChangeText={text => { setNumber(text) }}
              placeholder='Número'
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
          <View style={{ width: '50%', marginRight: '10%' }}>
            <TextInputPattern
              typeIcon={typesIcon.MaterialCommunityIcons}
              icon="calendar"
              typeMask={Type.DATE}
              value={expiry}
              onChangeText={text => { setExpiry(text); }}
              placeholder='Validade'
              keyboardType='number-pad'
              autoCorrect={false}
              maxLength={5}
            />
          </View >
          <View style={{ width: '40%' }}>
            <TextInputPattern
              typeIcon={typesIcon.Feather}
              icon="lock"
              typeMask={Type.NUMBER}
              value={security}
              onChangeText={text => { setSecurity(text); }}
              placeholder='CVV'
              keyboardType='numeric'
              autoCorrect={false}
              maxLength={3}
            />
          </View>
        </View>

        <View>
          <TextInputPattern
            value={holder}
            onChangeText={text => { setHolder(text) }}
            placeholder='Nome completo'
            autoCorrect={false}
            icon="user-o"
            typeIcon={typesIcon.FontAwesome}
          />
        </View>
        
        <View style={{ marginTop: 10, marginBottom: 30 }}>
          <ButtonComponent text="Salvar" onPress={handleSubmit} disabled={disabled} />
        </View>
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
  line: {
    flexDirection: 'row',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    paddingLeft: 10,
  },
});
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import ListCreditCard from '../../components/ListCreditCard';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CreditCardActions } from '../../store/ducks/creditCard';
import { DecryptValue } from '../../utils/crypto';
import Dialog from "react-native-dialog";
import CustomProgressBar from '../../components/CustomProgressBar';
import { useNavigation } from '@react-navigation/native';
import StatusBarComponent from '../../components/StatusBar';


const CreditCardList = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [idCard, setIdCard] = useState('');
  const [itemCard, setItemCard] = useState('');
  const { profile, creditCard } = useSelector(state => state);

  useEffect(() => {
    dispatch(CreditCardActions.creditCardRequest(profile.dataUser.id));
  }, []);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const onPressDelete = () => {
    dispatch(CreditCardActions.creditCardDelete(idCard));
    hideDialog();
  };

  const onPressPut = (item) => {
    dispatch(CreditCardActions.creditCardEdit())
    navigation.navigate('CreditCard', {
      title: 'Editar Cartão',
      item
    });
  };

  const RenderDisplayDialog = () => {

    return (
      <View style={{ alignItems: "center" }}>
        <Dialog.Container visible={visible} >
          <Dialog.Title>Você quer mesmo excluir este cartão?</Dialog.Title>
          <Dialog.Description>
            Todos os dados salvos serão apagados do aplicativo.
          </Dialog.Description>
          <TouchableOpacity style={style.commandButton} activeOpacity={0.5} onPress={onPressDelete}>
            <Text style={style.panelButtonTitle}>Apagar cartão</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.cancel} activeOpacity={0.5} onPress={hideDialog}>
            <Text style={style.textSign}>Agora não</Text>
          </TouchableOpacity>
        </Dialog.Container>
      </View>
    );
  };

  const RenderList = () => {

    var list = [];

    !creditCard.creditCards ? [] : creditCard.creditCards.forEach(element => {
      let _cards = {};
      _cards = {
        id: element.id,
        status: element.status,
        holder: element.holder,
        flag: element.flag,
        number: DecryptValue(element.number).substring(12, 16),
        expirationDate: DecryptValue(element.expirationDate),
        type: element.type,
      };

      list.push(_cards);
    });

    return (
      <FlatList
        style={style.list}
        showsVerticalScrollIndicator={false}
        data={list}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ListCreditCard 
            data={item} 
            onPressDelete={showDialog} 
            onPressPut={() => onPressPut(item)} 
            setIdCard={setIdCard(item.id)}/>
        )}
      >
      </FlatList>
    )
  };

  return (
    <View style={style.container}>
      <StatusBarComponent />
      
      {creditCard.onDelete ? <CustomProgressBar /> : null}
      { creditCard.loadingData ?
        <View style={style.loading}>
          <ActivityIndicator size='large' color='#59578e' />
        </View>
        :
        <View>
          <RenderDisplayDialog />
          <RenderList />
        </View>
      }

    </View>
  );
};

export default CreditCardList;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    paddingTop: 15,
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
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
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
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#59578e'
  }
});
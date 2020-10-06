import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Platform,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import { useSelector, useDispatch } from 'react-redux';
import { Creators as ProfileActions } from '../../store/ducks/profile';
import { InputMask, Type, RemoveMask } from '../../components/InputMask';
import CustomProgressBar from '../../components/CustomProgressBar';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {

  const dispatch = useDispatch();
  const { profile } = useSelector(state => state);
  const navigation = useNavigation();

  const [name, setName] = useState(profile.dataUser.name);
  const [email, setEmail] = useState(profile.dataUser.email);
  const [phone, setPhone] = useState(profile.dataUser.phone);

  const { height } = Dimensions.get('window');

  useEffect(() => {
    if (profile.goBack) {
      navigation.goBack();
    }
  }, [profile.goBack])

  const handleSubmit = () => {

    var values = {
        id: profile.dataUser.id,
        name: name,
        email: email,
        phone: RemoveMask(phone, Type.PHONE),
    };

    dispatch(ProfileActions.editRequest(values));
  };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}> Upload foto </Text>
        <Text style={styles.panelSubtitle}> Selecione sua foto preferida </Text>
      </View>
      <TouchableOpacity style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}> Tirar foto </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}> Escolha da Biblioteca </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}> Cancelar  </Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}>

        </View>
      </View>
    </View>
  );

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <View style={[styles.container, { height }]}>

      <Animated.View style={{
        margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
      }}>
        <CustomProgressBar visible={profile.loadingEdit} />

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <ImageBackground
                source={{
                  uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}
              >
                <View style={styles.centerItens}>
                  <Icon name="camera" size={35} color='#fff' style={styles.iconCamera}>
                  </Icon>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>

          <Text style={styles.name}>
            {name}
          </Text>

        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} color="#59578e" />
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder='Nome'
            placeholderTextColor='#666666'
            style={styles.textInput}
            autoCorrect={false}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" size={20} color="#59578e" />
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder='E-mail'
            placeholderTextColor='#666666'
            keyboardType='email-address'
            style={styles.textInput}
            autoCorrect={false}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" size={20} color="#59578e" />
          <InputMask
            type={Type.PHONE}
            value={phone}
            onChangeText={text => setPhone(text)}
            placeholder='Número'
            placeholderTextColor='#666666'
            keyboardType='number-pad'
            style={styles.textInput}
            autoCorrect={false}
            maxLength={15}
          />
        </View>

        <TouchableOpacity style={styles.commandButton} onPress={handleSubmit}>
          <Text style={styles.panelButtonTitle}> Salvar </Text>
        </TouchableOpacity>
      </Animated.View>

      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />

    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  centerItens: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCamera: {
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
  },
  commandButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#59578e',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#fff',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 1,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRightColor: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#59578e',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  colorPattern: {
    color: '#59578e',
  }
});
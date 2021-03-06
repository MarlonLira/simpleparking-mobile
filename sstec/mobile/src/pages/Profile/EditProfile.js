import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Dimensions,
  Modal,
  PermissionsAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Animated from 'react-native-reanimated';
import ButtonComponent from '../../components/Button';
import { TextInputPattern, TextInputMask, typesIcon, Type, RemoveMask } from '../../components/TextInput';
import StatusBarComponent from '../../components/StatusBar';
import BottomSheet from '../../components/BottomSheet';
import ImagePiker from 'react-native-image-picker';
import CameraRoll from '@react-native-community/cameraroll';
import AsyncStorage from '@react-native-community/async-storage';
import { Base64 } from '../../utils/Atob';

import { useSelector, useDispatch } from 'react-redux';
import { Creators as ProfileActions } from '../../store/ducks/profile';
import CustomProgressBar from '../../components/CustomProgressBar';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

import { RNCamera } from 'react-native-camera';

const EditProfile = () => {

  const dispatch = useDispatch();
  const { getPhoto } = useContext(AuthContext);
  const { profile } = useSelector(state => state);
  const navigation = useNavigation();

  const [name, setName] = useState(profile.dataUser.name);
  const [email, setEmail] = useState(profile.dataUser.email);
  const [phone, setPhone] = useState(profile.dataUser.phone);
  const [photo, setPhoto] = useState(profile.photoProfile);
  const [sendPhoto, setSendPhoto] = useState('');

  const [show, setShow] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [typeCamera, setTypeCamera] = useState(RNCamera.Constants.Type.back);

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
      image: sendPhoto,
    };

    dispatch(ProfileActions.editRequest(values));
  };

  const handleCloseButton = () => setShow(false);

  const takePicture = async (camera) => {

    const options = { quality: 0.5, base64: true }
    const data = await camera.takePictureAsync(options);

    setSendPhoto(data.base64);

    setPhoto(data.uri);

    savePicture(data.uri);

    setShowCamera(false);

    getPhoto();
  };

  const hasAndroidPermission = async () => {
    const Permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(Permission);

    if (hasPermission) {
      return true;
    };

    const status = await PermissionsAndroid.request(Permission);

    return status === 'granted';
  };

  const savePicture = async (data) => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    };

    CameraRoll.save(data, 'photo')
      .then((res) => {
        console.log('Salvo com sucesso: ' + res);
        savePhoto(res);
      }).catch((error) => {
        console.log('Error ao salvar: ' + error);
      });
  };

  const savePhoto = async (data) => {
    await AsyncStorage.removeItem('Photo_user');
    await AsyncStorage.setItem('Photo_user', data);
    getPhoto();
  }

  const toggleCam = () => {
    setTypeCamera(typeCamera === RNCamera.Constants.Type.back ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back);
  };

  const openLibrary = () => {
    const options = {
      tite: 'Selecione uma foto',
      chooseFromLibraryButtonTitle: 'Buscar foto...',
      noData: true,
      mediatype: 'photo',
    };

    ImagePiker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {

      } else if (response.error) {

      } else {
        setPhoto(response.uri);
        savePhoto(response.uri);
      }
    })
  };

  const RenderCamera = () => {
    return (
      <Modal
        transparent={false}
        visible={showCamera}
        animationType="slide"
      >
        <RNCamera
          type={typeCamera}
          style={styles.preview}
          flashMode={RNCamera.Constants.FlashMode.auto}
        >
          {({ camera, status, recordAndroidPermissionStatus }) => {
            if (status !== 'READY') return <View />;
            return (
              <View style={styles.lineCamera}>

                <TouchableOpacity style={styles.buttonCamera} onPress={() => takePicture(camera)}>
                  <Text>Foto</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCamera} onPress={toggleCam}>
                  <Text>Trocar</Text>
                </TouchableOpacity>

              </View>
            )
          }}
        </RNCamera>

        <TouchableOpacity style={styles.buttonClose} onPress={() => setShowCamera(false)}>
          <Text>X</Text>
        </TouchableOpacity>
      </Modal>
    )
  }

  const RenderInner = () => (
    <View >
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}> Upload foto </Text>
        <Text style={styles.panelSubtitle}> Selecione sua foto preferida </Text>
      </View>

      <ButtonComponent
        text="Tirar foto"
        onPress={() => { setShowCamera(true) }}
      />
      <ButtonComponent
        text="Escolha da Biblioteca"
        onPress={openLibrary}
      />
      <ButtonComponent
        text="Cancelar"
        onPress={() => setShow(false)}
      />

    </View>
  );

  return (
    <View style={[styles.container, { height }]}>

      <StatusBarComponent />

      <Animated.View style={{
        margin: 20,
      }}>
        <CustomProgressBar visible={profile.loadingEdit} />

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setShow(true)}>
            <View style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#59578e',
              borderWidth: 1
            }}>
              <ImageBackground
                source={{ uri: `data:image/png;base64,${Base64.atob(profile.dataUser.image)}` }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}
              >
                <View style={styles.centerItens}>
                  <Icon name="camera" size={35} color='#000' style={styles.iconCamera}>
                  </Icon>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>

          <Text style={styles.name}>
            {name}
          </Text>

        </View>

        <TextInputPattern
          icon="user-o"
          typeIcon={typesIcon.FontAwesome}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder='Nome'
          autoCorrect={false}
          mask={false}
        />

        <TextInputPattern
          icon="envelope-o"
          typeIcon={typesIcon.FontAwesome}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder='E-mail'
          keyboardType='email-address'
          autoCorrect={false}
        />

        <TextInputMask
          icon="phone"
          typeIcon={typesIcon.Feather}
          typeMask={Type.PHONE}
          value={phone}
          onChangeText={text => setPhone(text)}
          placeholder='Número'
          keyboardType='number-pad'
          autoCorrect={false}
          maxLength={15}
        />

        <View style={{ marginTop: 10, marginBottom: 30 }}>
          <ButtonComponent text="Salvar" onPress={handleSubmit} />
        </View>
      </Animated.View>

      <BottomSheet
        body={<RenderInner />}
        show={show}
        handleCloseButton={handleCloseButton}
      />
      <RenderCamera />
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
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  lineCamera: {
    marginBottom: 35,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  buttonCamera: {
    flex: 0,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    alignItems: 'center',
    margin: 20,
    width: 100,
  },
  buttonClose: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'absolute',
    margin: 5,
    width: 50,
    right: 25,
    top: 60,
  },
});


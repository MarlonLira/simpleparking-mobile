import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from '../../components/Stylized'
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../../contexts/auth';
import { set } from 'react-native-reanimated';
import { AlertDialog } from '../../utils/Functions';

const Signin = ({ navigation }) => {

  const [data, setData] = useState({
    userName: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const [load, setLoad] = useState({status: false});

  const { signin } = useContext(AuthContext);
  const { colors } = useTheme();

  const textInputChange = (val) => {
    if (val.trim().length >= 12) {
      setData({
        ...data,
        userName: val,
        check_textInputChange: true,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        userName: val,
        check_textInputChange: false,
        isValidUser: false
      });
    }
  }

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false
      });
    }
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const handleValidUser = (val) => {
    if (val.trim().length >= 12) {
      setData({
        ...data,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        isValidUser: false
      });
    }
  }

  const handleLoad = () => {
    setLoad({status: true});
  };

  const handleLoadOff = () => {
    setLoad({status: false});
  };

  const loginHandle = (userName, password) => {
    
    handleLoad();

    if (data.userName == '' || data.password == '') {
      AlertDialog('Erro','O campo Email e/ou Senha não pode estar vazio.', { text: 'Ok' } );
      handleLoadOff(); 
      return;
    } else if (data.userName.length == 0 || data.password.length == 0) {
      AlertDialog('Erro','O campo Email e/ou Senha não pode estar vazio.', { text: 'Ok' } );
      handleLoadOff();
      return;
    }

    var foundUser = {
      "user": {
        email: userName,
        password,
      }
    }

    if (data.isValidPassword && data.isValidUser) {
      signin(foundUser, 'post').then(() => {
        handleLoadOff();
      });
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#59578e' barStyle="light-content" />
      <View style={thisStyles.header}>
        <Text style={styles.text_header}>Bem vindo!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[thisStyles.footer, {
          backgroundColor: colors.background
        }]}
      >
        <Text style={[styles.text_footer, {
          color: colors.text
        }]}>Email</Text>
        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            color={colors.text}
            size={20}
          />
          <TextInput
            placeholder="Informe seu Eemail"
            placeholderTextColor="#666666"
            style={[styles.textInput, {
              color: colors.text
            }]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ?
            <Animatable.View
              animation="bounceIn"
            >
              <Feather
                name="check-circle"
                color="green"
                size={20}
              />
            </Animatable.View>
            : null}
        </View>
        {data.isValidUser ? null :
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>O Email de usuário deve ter no minímo 12 caracteres.</Text>
          </Animatable.View>
        }

        <Text style={[styles.text_footer, {
          color: colors.text,
          marginTop: 35
        }]}>Senha</Text>
        <View style={styles.action}>
          <Feather
            name="lock"
            color={colors.text}
            size={20}
          />
          <TextInput
            placeholder="Informe sua senha"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[styles.textInput, {
              color: colors.text
            }]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity
            onPress={updateSecureTextEntry}
          >
            {data.secureTextEntry ?
              <Feather
                name="eye-off"
                color="grey"
                size={20}
              />
              :
              <Feather
                name="eye"
                color="grey"
                size={20}
              />
            }
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null :
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>A senha deve ter no mínimo 6 caracteres.</Text>
          </Animatable.View>
        }

        <TouchableOpacity>
          <Text style={{ color: '#59578e', marginTop: 15 }}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => { loginHandle(data.userName, data.password) }}
          >
            <LinearGradient
              colors={['#59578e', '#59578e']}
              style={styles.signIn}
            >
              {load.status ? <ActivityIndicator size="large" color="#FFF" /> :
              <Text style={[styles.textSign, {
                color: '#fff'
              }]}>Entrar</Text>}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={[styles.signIn, {
              borderColor: '#59578e',
              borderWidth: 1,
              marginTop: 15
            }]}
          >
            <Text style={[styles.textSign, {
              color: '#59578e'
            }]}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Signin;

const thisStyles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  }
});
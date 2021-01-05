import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { InputMask, Type, RemoveMask } from '../../components/InputMask';
import { AlertDialog } from '../../utils/Functions';
import { styles } from '../../components/Stylized'
import { useTheme } from 'react-native-paper';

import BackgroundUi from '../../components/BackgroundUi';
import { TextInputPattern, TextInputMask, typesIcon } from '../../components/TextInput';

const SignUp = ({ navigation }) => {

  const [data, setData] = useState({
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isCorrespondingPassword: true,
  });

  const [load, setLoad] = useState({ status: false });

  const [name, setName] = useState('');
  const [registryCode, setRegistryCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp } = useContext(AuthContext);
  const { colors } = useTheme();

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
  };

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
  };

  const handleConfirmPasswordChange = (val) => {
    if (val.trim().length >= 6 && val == password) {
      setData({
        ...data,
        isCorrespondingPassword: true
      });
    } else {
      setData({
        ...data,
        isCorrespondingPassword: false
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const handleValidEmail = (val) => {
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
    setLoad({ status: true });
  };

  const handleLoadOff = () => {
    setLoad({ status: false });
  };

  function handleSignUp() {

    handleLoad();

    if (name != '' &&
      registryCode != '' &&
      phone != '' &&
      email != '' &&
      password != '' &&
      confirmPassword != '') {
      let values = {
        name,
        registryCode: RemoveMask(registryCode, Type.CPF),
        phone: RemoveMask(phone, Type.PHONE),
        email,
        password,
      }

      signUp(values, 'post').then(() => {
        handleLoadOff();
      });
    } else {
      AlertDialog('Ateção', 'Preencha os campos obrigatórios, para continuar!', { text: 'Ok' });
      handleLoadOff();
    }
  }

  return (
    <BackgroundUi>
      <TextInputPattern
        icon="user-o"
        typeIcon={typesIcon.FontAwesome}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder='Nome'
        autoCorrect={false}
        mask={false}
        label="Nome"
      />

      <TextInputPattern
        icon="at"
        typeIcon={typesIcon.FontAwesome}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder='Informe seu Email'
        autoCorrect={false}
        mask={false}
        label="Email"
      />

      <TextInputMask
        icon="phone"
        typeIcon={typesIcon.Feather}
        typeMask={Type.CPF}
        value={registryCode}
        onChangeText={text => setRegistryCode(text)}
        placeholder='Informe seu CPF'
        keyboardType='number-pad'
        autoCorrect={false}
        maxLength={15}
        label="CPF"
      />

      <TextInputMask
        icon="phone"
        typeIcon={typesIcon.Feather}
        typeMask={Type.PHONE}
        value={phone}
        onChangeText={text => setPhone(text)}
        placeholder='Informe seu Telefone'
        keyboardType='number-pad'
        autoCorrect={false}
        maxLength={15}
        label="Telefone"
      />

    </BackgroundUi>
  )

  // return (

  //   <ScrollView style={styles.container}>
  //       <StatusBar backgroundColor='#59578e' barStyle="light-content" />
  //       <View style={styles.header}>
  //         <Text style={styles.text_header}>Cadastre-se</Text>
  //       </View>
  //       <Animatable.View
  //         animation="fadeInUpBig"
  //         style={[styles.footer, {
  //           backgroundColor: colors.background
  //         }]}
  //       >
  //         <Text style={[styles.text_footer, {
  //           color: colors.text
  //         }]}>Nome</Text>
  //         <View style={styles.action}>
  //           <FontAwesome
  //             name="user-o"
  //             color={colors.text}
  //             size={20}
  //           />
  //           <TextInput
  //             placeholder="Informe seu Nome"
  //             placeholderTextColor="#666666"
  //             style={[styles.textInput, {
  //               color: colors.text
  //             }]}
  //             autoCapitalize="none"
  //             onChangeText={(text) => setName(text)}
  //             onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
  //           />
  //         </View>

  //         <Text style={[styles.text_footer, {
  //           color: colors.text
  //         }]}>Email</Text>
  //         <View style={styles.action}>
  //           <FontAwesome
  //             name="at"
  //             color={colors.text}
  //             size={20}
  //           />
  //           <TextInput
  //             placeholder="Informe seu Eemail"
  //             placeholderTextColor="#666666"
  //             style={[styles.textInput, {
  //               color: colors.text
  //             }]}
  //             autoCapitalize="none"
  //             onChangeText={(text) => setEmail(text)}
  //             onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
  //           />
  //         </View>
  //         {data.isValidUser ? null :
  //           <Animatable.View animation="fadeInLeft" duration={500}>
  //             <Text style={styles.errorMsg}>O Email de usuário deve ter no minímo 12 caracteres.</Text>
  //           </Animatable.View>
  //         }

  //         <Text style={[styles.text_footer, {
  //           color: colors.text
  //         }]}>CPF</Text>
  //         <View style={styles.action}>
  //           <FontAwesome
  //             name="address-card-o"
  //             color={colors.text}
  //             size={20}
  //           />
  //           <InputMask
  //             type={Type.CPF}
  //             placeholder="Informe seu CPF"
  //             placeholderTextColor="#666666"
  //             style={[styles.textInput, {
  //               color: colors.text
  //             }]}
  //             value={registryCode}
  //             autoCapitalize="none"
  //             onChangeText={(text) => setRegistryCode(text)}
  //             maxLength={14}
  //           />
  //         </View>

  //         <Text style={[styles.text_footer, {
  //           color: colors.text
  //         }]}>Telefone</Text>
  //         <View style={styles.action}>
  //           <FontAwesome
  //             name="phone"
  //             color={colors.text}
  //             size={20}
  //           />
  //           <InputMask
  //             type={Type.PHONE}
  //             placeholder="Informe seu Telefone"
  //             placeholderTextColor="#666666"
  //             style={[styles.textInput, {
  //               color: colors.text
  //             }]}
  //             value={phone}
  //             autoCapitalize="none"
  //             onChangeText={(text) => setPhone(text)}
  //             maxLength={15}
  //           />
  //         </View>

  //         <Text style={[styles.text_footer, {
  //           color: colors.text,
  //         }]}>Senha</Text>
  //         <View style={styles.action}>
  //           <Feather
  //             name="lock"
  //             color={colors.text}
  //             size={20}
  //           />
  //           <TextInput
  //             placeholder="Informe sua senha"
  //             placeholderTextColor="#666666"
  //             secureTextEntry={data.secureTextEntry ? true : false}
  //             style={[styles.textInput, {
  //               color: colors.text
  //             }]}
  //             autoCapitalize="none"
  //             onChangeText={(text) => {
  //               setPassword(text);
  //               handlePasswordChange(text);
  //             }}
  //           />
  //           <TouchableOpacity
  //             onPress={updateSecureTextEntry}
  //           >
  //             {data.secureTextEntry ?
  //               <Feather
  //                 name="eye-off"
  //                 color="grey"
  //                 size={20}
  //               />
  //               :
  //               <Feather
  //                 name="eye"
  //                 color="grey"
  //                 size={20}
  //               />
  //             }
  //           </TouchableOpacity>
  //         </View>

  //         {data.isValidPassword ? null :
  //           <Animatable.View animation="fadeInLeft" duration={500}>
  //             <Text style={styles.errorMsg}>A senha deve ter no mínimo 6 caracteres.</Text>
  //           </Animatable.View>
  //         }

  //         <Text style={[styles.text_footer, {
  //           color: colors.text,
  //         }]}>Confirmar senha</Text>
  //         <View style={styles.action}>
  //           <Feather
  //             name="lock"
  //             color={colors.text}
  //             size={20}
  //           />
  //           <TextInput
  //             placeholder="Confirme sua senha"
  //             placeholderTextColor="#666666"
  //             secureTextEntry={data.secureTextEntry ? true : false}
  //             style={[styles.textInput, {
  //               color: colors.text
  //             }]}
  //             autoCapitalize="none"
  //             onChangeText={(text) => {
  //               setConfirmPassword(text);
  //               handleConfirmPasswordChange(text);
  //             }}
  //           />
  //           <TouchableOpacity
  //             onPress={updateSecureTextEntry}
  //           >
  //             {data.secureTextEntry ?
  //               <Feather
  //                 name="eye-off"
  //                 color="grey"
  //                 size={20}
  //               />
  //               :
  //               <Feather
  //                 name="eye"
  //                 color="grey"
  //                 size={20}
  //               />
  //             }
  //           </TouchableOpacity>
  //         </View>

  //         {data.isCorrespondingPassword ? null :
  //           <Animatable.View animation="fadeInLeft" duration={500}>
  //             <Text style={styles.errorMsg}>As senhas não correspondem!</Text>
  //           </Animatable.View>
  //         }

  //         <View style={styles.button}>
  //           <TouchableOpacity
  //             style={styles.signIn}
  //             onPress={handleSignUp}
  //           >
  //             <LinearGradient
  //               colors={['#59578e', '#59578e']}
  //               style={styles.signIn}
  //             >
  //               {
  //                 load.status ? <ActivityIndicator  size="large" color="#FFF" />
  //                   :
  //                   <Text style={[styles.textSign, {
  //                     color: '#fff'
  //                   }]}>Cadastrar</Text>
  //               }
  //             </LinearGradient>
  //           </TouchableOpacity>

  //           <TouchableOpacity
  //             onPress={() => navigation.goBack()}
  //             style={[styles.signIn, {
  //               borderColor: '#59578e',
  //               borderWidth: 1,
  //               marginTop: 15
  //             }]}
  //           >
  //             <Text style={[styles.textSign, {
  //               color: '#59578e'
  //             }]}>Voltar</Text>
  //           </TouchableOpacity>
  //         </View>

  //       </Animatable.View>
  //   </ScrollView>
  // );
};

export default SignUp;

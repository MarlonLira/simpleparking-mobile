import React, { useContext, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import ButtonCustom, { typesIcon } from '../../components/ButtonCustom';

import { AuthContext } from '../../contexts/auth';

import { useSelector, useDispatch } from 'react-redux';
import { Creators as ProfileActions } from '../../store/ducks/profile';

export default function Profile() {

  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(ProfileActions.getUserRequest(user.id));
  }, []);

  const { profile } = useSelector(state => state);

  return (
    <SafeAreaView style={styles.container}>

      {profile.loading ?
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='#fff' />
        </View>
        :
        <View style={{ backgroundColor: '#59578e', }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.infoProfile}>
              <View style={styles.userInfoSection}>
                <View style={styles.startView}>
                  <Avatar.Image
                    source={{
                      uri: profile.photoProfile,
                    }}
                    size={90}
                    style={{ marginTop: -60, elevation: 15 }}>
                  </Avatar.Image>
                  <View>
                    <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>{profile.dataUser.name}</Title>
                  </View>
                </View>
              </View>

              <View style={styles.userInfoSection}>
                <View style={styles.row}>
                  <Feather name='map-pin' style={styles.colorOptional} size={20} />
                  <Text style={[styles.colorOptional, { marginLeft: 20 }]} > R. Guimarães peixoto, 159 </Text>
                </View>
                <View style={styles.row}>
                  <Feather name='phone' style={styles.colorOptional} size={20} />
                  <Text style={[styles.colorOptional, { marginLeft: 20 }]} > {profile.dataUser.phone} </Text>
                </View>
                <View style={styles.row}>
                  <Feather name='mail' style={styles.colorOptional} size={20} />
                  <Text style={[styles.colorOptional, { marginLeft: 20 }]} > {profile.dataUser.email} </Text>
                </View>
              </View>
            </View>

            <View style={styles.infoBoxWrapper}>
              <View style={[styles.infoBox, { borderRightColor: '#dddddd', borderRightWidth: 1 }]}>
                <Title> 150 </Title>
                <Caption> Agendamentos Realizados </Caption>
              </View>
              <View style={styles.infoBox}>
                <Title> 15 </Title>
                <Caption> Estacionamentos visitados </Caption>
              </View>
            </View>

            <View style={styles.menuWrapper}>
              
                <ButtonCustom
                  text="Estacionamentos favoritos"
                  typeIcon={typesIcon.Feather}
                  icon="heart"
                  onPress={() => { }}
                />

                <ButtonCustom
                  text="Formas de pagamento"
                  typeIcon={typesIcon.FontAwesome}
                  icon="credit-card"
                  onPress={() => { navigation.navigate('CreditCardList') }}
                />

                <ButtonCustom
                  text="Meu Carro"
                  typeIcon={typesIcon.MaterialCommunityIcons}
                  icon="car-back"
                  onPress={() => { navigation.navigate('CarList') }}
                />

                <ButtonCustom
                  text="Meu endereço"
                  typeIcon={typesIcon.MaterialCommunityIcons}
                  icon="home-map-marker"
                  onPress={() => { }}
                />
            </View>
          </ScrollView>
        </View>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#fff',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    backgroundColor: '#fff',
  },
  colorOptional: {
    color: '#777777',
  },
  loading: {
    flex: 1,
    backgroundColor: '#59578e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoProfile: {
    borderRadius: 15,
    backgroundColor: '#fff',
    marginTop: 50,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    elevation: 15,
  },
  startView: {
    flexDirection: 'column',
    marginTop: 15,
    alignItems: 'center',
  },
});

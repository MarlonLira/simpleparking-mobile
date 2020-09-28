import React, { useContext, useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'

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
                      uri: 'https://api.adorable.io/avatars/50/abott@adorable.png',
                    }}
                    size={90}
                    style={{ marginTop: -60, elevation: 15 }}>
                  </Avatar.Image>
                  <View style={{ marginLeft: 20 }}>
                    <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}> {profile.dataUser.name} </Title>
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
            <View>
              <View style={styles.menuWrapper}>
                <View style={{ width: '50%', alignItems: 'center' }}>
                  <TouchableRipple onPress={() => { }} style={styles.buttonStyle}>

                    <View style={styles.menuItem}>
                      <View style={styles.iconItem}>
                        <Feather name="heart" color="#59578e" size={30} />
                      </View>
                      <Text style={styles.menuItemText}>Estacionamentos favoritos</Text>
                    </View>
                  </TouchableRipple>

                  <TouchableRipple
                    onPress={() => { navigation.navigate('CreditCardList') }}
                    style={styles.buttonStyle}>
                    <View style={styles.menuItem}>
                      <View style={styles.iconItem}>
                        <Icon name="credit-card" color="#59578e" size={30} />
                      </View>
                      <Text style={styles.menuItemText}>Formas de pagamento</Text>
                    </View>
                  </TouchableRipple>

                </View>
                <View style={{ width: '50%', alignItems: 'center' }}>

                  <TouchableRipple onPress={() => { navigation.navigate('CarList') }} style={styles.buttonStyle}>
                    <View style={styles.menuItem}>
                      <View style={styles.iconItem}>
                        <Material name="car-back" color="#59578e" size={30} />
                      </View>
                      <Text style={styles.menuItemText}>Meu Carro</Text>
                    </View>
                  </TouchableRipple>

                </View>
              </View>
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
  caption: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "500",
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  menuItem: {
    flexDirection: 'column',
    padding: 10,
  },
  menuItemText: {
    color: '#5E5E5E',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
    alignItems: 'flex-start',
    marginTop: 10,
    fontWeight: "bold",
  },
  colorPattern: {
    color: '#59578e',
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
  buttonStyle: {
    width: 160,
    height: 150,
    margin: 10,
    backgroundColor: 'hsl(242,24%,90%)',
    borderRadius: 15,
  },
  iconItem: {
    backgroundColor: 'hsl(242,24%,80%)',
    padding: 8,
    borderRadius: 20,
    width: 49
  },
  itemSelected: {
    borderWidth: 1,
    borderColor: '#59578e',
    elevation: 15,
  }
});

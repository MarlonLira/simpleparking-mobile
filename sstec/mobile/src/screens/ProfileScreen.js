import React from 'react'
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';

import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../pages/Profile/Profile';
import EditProfile from '../pages/Profile/EditProfile';

import CreditCardList from '../pages/CreditCard/CreditCardList';
import CreditCard from '../pages/CreditCard/CreditCard';

import CarList from '../pages/Car/CarList';
import Car from '../pages/Car/Car';


const ProfileStackScrenn = ({ navigation }) => {

  const ProfileStack = createStackNavigator();
  const { creditCard, car } = useSelector(state => state);

  return (

    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#59578e',
          elevation: 0
        },
      }}>
      <ProfileStack.Screen
        name="Perfil"
        component={Profile}
        options={{
          title: '',
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingLeft: 15 }}
              onPress={() => navigation.openDrawer()}
              activeOpacity={0.5}>
              <Icon
                name="menu-outline"
                size={35}
                backgroundColor="#fff"
                color="#fff"
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingRight: 15 }}
              onPress={() => navigation.navigate('EditProfile')}
              activeOpacity={0.5} >
              <MaterialCommunityIcons
                name="account-edit"
                size={35}
                backgroundColor="#fff"
                color="#fff"
              />
            </TouchableOpacity>
          )
        }}
      />

      <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: 'Editar Perfil',
          headerTintColor: '#59578e',
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0
          }
        }}

        component={EditProfile}
      >
      </ProfileStack.Screen>

      <ProfileStack.Screen
        name="CreditCardList"
        options={{
          title: 'Formas de pagamento',
          headerTintColor: '#59578e',
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingRight: 15 }}
              onPress={() => navigation.navigate('CreditCard')}
              activeOpacity={0.5} >
              <MaterialCommunityIcons
                name="credit-card-plus-outline"
                size={35}
                backgroundColor="#fff"
                color="#59578e"
              />
            </TouchableOpacity>
          )
        }}
        component={CreditCardList}
      />

      <ProfileStack.Screen
        name="CreditCard"
        options={{
          title: creditCard.onEdit ? 'Edtidar cartão' : 'Cadastrar Cartão',
          headerTintColor: '#59578e',
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0
          },
        }}
        component={CreditCard}
      />

      <ProfileStack.Screen
        name="CarList"
        options={{
          title: 'Meus carros',
          headerTintColor: '#59578e',
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingRight: 15 }}
              onPress={() => navigation.navigate('Car')}
              activeOpacity={0.5} >
              <MaterialCommunityIcons
                name="plus"
                size={35}
                backgroundColor="#fff"
                color="#59578e"
              />
            </TouchableOpacity>
          )
        }}
        component={CarList}
      />

      <ProfileStack.Screen
        name="Car"
        options={{
          title: !car.onEdit ? 'Cadastrar veículo' : 'Editar veículo',
          headerTintColor: '#59578e',
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0
          },
        }}
        component={Car}
      />

    </ProfileStack.Navigator>
  );
}

export default ProfileStackScrenn;
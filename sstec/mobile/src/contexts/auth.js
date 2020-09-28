import axios from 'axios';
import React, { useState, createContext, useEffect } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import {Decrypt} from '../utils/crypto';
import { AlertDialog } from '../utils/Functions';

export const AuthContext = createContext({});
const BASE_URL = api.API_URL;
const AUTH_URL = api.OAPI_URL;

function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('Auth_user');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }
    }

    loadStorage();
  }, []);

  async function signUp(values, method) {
    await axios[method](`${BASE_URL}/user/`, values)
      .then((request) => {
        setUser(request.data.result);
      }).catch(error => {
        console.log(error.message);
        AlertDialog('Erro', error.message, { text: 'Ok' });
      });
  }

  async function signin(values, method) {
    await axios[method](`${AUTH_URL}/user/signin/`, values)
      .then((request) => {
        insertUser(Decrypt(request.data.result));
      }).catch(error => {
        console.log(error.message);
        AlertDialog('Erro', error.message, { text: 'Ok' });
      });
  }

  function insertUser(data) {
    var _data;
    if (data.token) {
      _data = {
        id: data.user.id,
        name: data.user.name,
        registryCode: data.user.registryCode,
        email: data.user.email,
        phone: data.user.phone,
      };
    } else {
      _data = {
        id: data.result.id,
        name: data.result.name,
        registryCode: data.result.registryCode,
        email: data.result.email,
        phone: data.result.phone,
      };
    };
    setUser(_data);
    storageUser(_data);
  }

  async function storageUser(data) {
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
  }

  async function signOut(){
    await AsyncStorage.clear()
    .then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signUp, signin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
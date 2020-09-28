import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native';
import Routes from './src/routes/routes';
import AuthProvider from './src/contexts/auth';
import { Provider } from 'react-redux';

import store from './src/store'

export default function App() {

  return (
    <Provider store={store}>
        <NavigationContainer >
          <AuthProvider>
            <StatusBar backgroundColor='#59578e' barStyle="light-content" />
            <Routes />
          </AuthProvider>
        </NavigationContainer>
    </Provider>
  );
};

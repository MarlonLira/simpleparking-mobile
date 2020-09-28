import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Signin from '../pages/Signin/Signin';
import SignUp from '../pages/SignUp/SignUp';
import SplashScreen from '../pages/SplashScreen/SplashScreen'

const AuthStack = createStackNavigator();

function AuthRoutes() {
  return (
    <AuthStack.Navigator>

      <AuthStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />

      <AuthStack.Screen
        name="Signin"
        component={Signin}
        options={{ headerShown: false }}
      />

      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />

    </AuthStack.Navigator>
  );
}

export default AuthRoutes;


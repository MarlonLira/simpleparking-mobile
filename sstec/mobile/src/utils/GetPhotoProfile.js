import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default async function getPhoto() {
  const photoProfile = await AsyncStorage.getItem('Photo_user');

  if (photoProfile) {
    console.log(photoProfile);
    return photoProfile
  };

  return '';
};
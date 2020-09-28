import React from 'react';
import styled from 'styled-components/native';

export const Background = styled.View`
  flex:1;
  background-color: #FFF;
`;

export const Container = styled.KeyboardAvoidingView`
  flex:1;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  margin-bottom: 15px;
  width: 150px;
  height: 150px;
`;

export const AreaInput = styled.View`
  flex-direction: row; 
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#59578e'
})`
  width: 90%;
  font-size: 17px;
  color: #59578e;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px;
  border-color: #59578e;
  border-radius: 7px;
  background-color: #FFF;
`;

export const SubmitButton = styled.TouchableOpacity`
  align-items:center;
  justify-content:center;
  background-color: #59578e;
  width: 90%;
  height: 45px;
  margin-top: 10px;
  border-radius: 10px;
`;

export const SubmitText = styled.Text`
   font-size: 15px;
   color: #FFF;
`;

export const Link = styled.TouchableOpacity`
  margin-top: 5px;
  margin-bottom: 10px;
`;

export const LinkText = styled.Text`
  color: #59578e;  
`;

export const Scroll = styled.ScrollView`
  flex: 1;
`;


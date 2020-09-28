import React from 'react';
import { TextInputMask } from 'react-native-masked-text';


const InputMask = (props) => {
  return (
    <TextInputMask
      type={props.type}
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor}
      style={props.style}
      value={props.value}
      onChangeText={props.onChangeText}
      autoCapitalize={props.autoCapitalize}
      onEndEditing={props.onEndEditing}
      maxLength={props.maxLength}
      onFocus={props.onFocus}
    />
  );
};

const Type = {
  PHONE: 'cel-phone',
  CPF: 'cpf',
  CNPJ: 'cnpj',
  CARD: 'credit-card',
  DATE: 'datetime',
  MONEY: 'money',
  NUMBER: 'only-numbers',
  ZIPCODE: 'zip-code',
  TEXT: 'text',
};

const RemoveMask = (value, Type) => {
  if (value && !Type.MONEY){
    return value.replace(/[^\d]+/g, '');
  };
};

export { InputMask, Type, RemoveMask };
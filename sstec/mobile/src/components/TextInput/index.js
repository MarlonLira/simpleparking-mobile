import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionic from 'react-native-vector-icons/Ionicons';
import { Action, TextStandard, Label, InputMask } from './styles';

const ColorIcon = '#000';

export const TextInputPattern = ({
  value,
  onChangeText,
  placeholder,
  style,
  autoCorrect,
  maxLength,
  icon,
  typeIcon,
  label,
  editable,
  keyboardType,

}) => {

  return (
    <>
      { label ? <Label>{label}</Label> : null}
      <Action>
        {icon && typeIcon ? returnTypeIcon(typeIcon, icon) : null}
        <TextStandard
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor='#666666'
          style={style}
          autoCorrect={autoCorrect}
          maxLength={maxLength}
          editable={editable}
          keyboardType={keyboardType}
        />
      </Action>
    </>
  );
}

export const TextInputMask = ({
  value,
  onChangeText,
  placeholder,
  style,
  autoCorrect,
  maxLength,
  icon,
  typeIcon,
  label,
  editable,
  keyboardType,
  typeMask,
}) => {
  return (
    <>
      { label ? <Label>{label}</Label> : null}
      <Action>
        {icon && typeIcon ? returnTypeIcon(typeIcon, icon) : null}
        <InputMask
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor='#666666'
          style={style}
          autoCorrect={autoCorrect}
          maxLength={maxLength}
          editable={editable}
          keyboardType={keyboardType}
          type={typeMask}
        />
      </Action>
    </>
  )
};

export const typesIcon = {
  Feather: 'Feather',
  FontAwesome: 'FontAwesome',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  Ionic: 'Ionic',
};

export const Type = {
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

export const RemoveMask = (value, Type) => {
  if (value && !Type.MONEY) {
    return value.replace(/[^\d]+/g, '');
  };
};

const returnTypeIcon = (typeIcon, icon) => {
  switch (typeIcon) {
    case typesIcon.Feather:
      return <Feather name={icon} size={20} color={ColorIcon} />
    case typesIcon.FontAwesome:
      return <FontAwesome name={icon} size={20} color={ColorIcon} />
    case typesIcon.MaterialCommunityIcons:
      return <MaterialCommunityIcons name={icon} size={20} color={ColorIcon} />
    case typesIcon.Ionic:
      return <Ionic name={icon} size={20} color={ColorIcon} />
  }
}
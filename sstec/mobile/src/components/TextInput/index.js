import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { Action, TextStandard, Label } from './styles';

const TextInput = ({
  value,
  onChangeText,
  placeholder,
  style,
  autoCorrect,
  maxLength,
  icon,
  label,
  editable,
  keyboardType,
}) => {
  return (
    <>
    <Label>{label}</Label>
    <Action>
      <Feather name={icon} size={20} color="#59578e" />
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

export default TextInput;
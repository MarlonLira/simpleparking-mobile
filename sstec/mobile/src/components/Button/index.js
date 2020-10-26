import React from 'react';
import { SubmitButton, TextButton, Container } from './styles';

const Button = ({ text, onPress, disabled }) => {
  return (
    <Container>
      <SubmitButton onPress={onPress} activeOpacity={0.6} disabled={disabled} style={disabled ? { backgroundColor: '#dddde8' } : { backgroundColor: '#59578e' }}>
        <TextButton>{text}</TextButton>
      </SubmitButton>
    </Container>
  )
}

export default Button;
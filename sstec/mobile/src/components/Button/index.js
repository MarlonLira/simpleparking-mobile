import React from 'react';
import { SubmitButton, TextButton, Container } from './styles';

const Button = ({ text, onPress }) => {
  return (
    <Container>
      <SubmitButton onPress={onPress} activeOpacity={0.6}>
        <TextButton>{text}</TextButton>
      </SubmitButton>
    </Container>
  )
}

export default Button;
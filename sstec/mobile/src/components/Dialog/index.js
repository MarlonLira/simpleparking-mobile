import React from 'react';
import { View } from 'react-native';
import Dialog from "react-native-dialog";
import { Container } from './styles';

const DialogComponent = ({visible, hideDialog, onPressClose, title, description, body}) => {
  return (
    <Container>
      <Dialog.Container visible={visible} >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
        {body}
      </Dialog.Container>
    </Container>
  );
}

export default DialogComponent;

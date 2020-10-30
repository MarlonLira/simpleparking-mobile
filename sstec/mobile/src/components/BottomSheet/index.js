import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modal, ModalArea, ModalBody, CloseButton, ScrollBody } from './styles';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const BottomSheet = ({ show, handleCloseButton, body }) => {

  const navigation = useNavigation();

  return (
      <Modal
        transparent
        visible={show}
        animationType="slide"
      >
        <ModalArea>
          <ModalBody>
            <CloseButton onPress={handleCloseButton}>
              <MaterialIcons name="expand-more" size={40} color="#000" />
            </CloseButton>
            {body}
          </ModalBody>
        </ModalArea>

      </Modal>
  )
}

export default BottomSheet;
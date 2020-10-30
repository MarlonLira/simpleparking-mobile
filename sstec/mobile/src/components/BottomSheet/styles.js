import styled from 'styled-components/native';

export const Modal = styled.Modal`
  flex: 1;
`;

export const ModalArea = styled.View`
  flex: 1;
  background-color: rgba(0,0,0,0.5);
  justify-content: flex-end;
`;

export const ModalBody = styled.View`
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 300px;
  padding: 10px 20px 40px 20px;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;

export const ScrollBody = styled.ScrollView`
`; 
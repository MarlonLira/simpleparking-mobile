import styled from 'styled-components/native';
import { TouchableRipple } from 'react-native-paper';

export const Touchable = styled(TouchableRipple)`
  width: 160px;
  height: 150px;
  margin: 10px;
  background-color: hsl(242,24%,90%);
  border-radius: 15px;
`;

export const MenuItem = styled.View`
  flex-direction: column;
  padding: 10px;
`;

export const IconItem = styled.View`
  background-color: hsl(242,24%,80%);
  padding: 8px;
  border-radius: 20px;
  width: 49px;
`;

export const MenuItemText = styled.Text`
  color: #5E5E5E;
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  align-items: flex-start;
  margin-top: 10px;
  font-weight: bold;
`;
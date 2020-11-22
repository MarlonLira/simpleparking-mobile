import styled from 'styled-components/native';
import { TouchableRipple } from 'react-native-paper';

export const Touchable = styled(TouchableRipple)`
  width: 100%;
`;

export const MenuItem = styled.View`
  padding: 20px;
  flex-direction: row;
  align-items: center;
`;

export const IconItem = styled.View`
  margin-right: 8px;
  border-radius: 20px;
  align-items: center;
`;

export const MenuItemText = styled.Text`
  color: #000;
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
`;
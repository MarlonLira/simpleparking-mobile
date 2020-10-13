import styled from 'styled-components/native';
import {
  Platform,
} from 'react-native'

export const Action = styled.View`
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 5px;
  border-bottom-width: 1px;
  border-bottom-color: #f2f2f2;
  padding-bottom: 5px;
`;

export const TextStandard = styled.TextInput`
  margin-top: ${Platform.OS === 'ios' ? 0 : -12}px;
  padding-left: 10px;
  color: #59578e;
  width: 100%;
`;

export const Label = styled.Text`
  color: #000;
  font-size: 18px;
`
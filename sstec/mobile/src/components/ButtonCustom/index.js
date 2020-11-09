import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionic from 'react-native-vector-icons/Ionicons';

import { Touchable, MenuItem, IconItem, MenuItemText } from './styles';

const ButtonCustom = ({text, typeIcon, icon, onPress}) => {
  return (
    <Touchable onPress={onPress}>
      <MenuItem>
        <IconItem>
          {returnTypeIcon(typeIcon, icon)}
        </IconItem>
        <MenuItemText>{text}</MenuItemText>
      </MenuItem>
    </Touchable>
  )
}

export default ButtonCustom;

export const typesIcon = {
  Feather: 'Feather',
  FontAwesome: 'FontAwesome',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  Ionic: 'Ionic',
};

const returnTypeIcon = (typeIcon, icon) => {
  switch (typeIcon) {
    case typesIcon.Feather:
      return <Feather name={icon} size={30} color="#59578e" />
    case typesIcon.FontAwesome:
      return <FontAwesome name={icon} size={30} color="#59578e" />
    case typesIcon.MaterialCommunityIcons:
      return <MaterialCommunityIcons name={icon} size={30} color="#59578e" />
    case typesIcon.Ionic:
      return <Ionic name={icon} size={30} color="#59578e" />
  }
}
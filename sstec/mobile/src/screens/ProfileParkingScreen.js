import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ProfileParking from '../pages/ProfileParking/ProfileParking';

const ProfileParkingScreen = ({ navigation, route }) => {
  const ProfileParkingStack = createStackNavigator();
  return (
    <ProfileParkingStack.Navigator
      screenOptions={{
        headerStyle: {          
          backgroundColor: '#59578e',
          elevation: 0
        },
        headerTintColor: '#000'
      }}
    >
      <ProfileParkingStack.Screen
        name="ProfileParking"
        component={ProfileParking}
        initialParams={{data: route.params.parking}}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingLeft: 15 }}
              onPress={() => navigation.openDrawer()}
              activeOpacity={0.5}>
              <Icon
                name="menu-outline"
                size={35}
                backgroundColor="#fff"
                color="#fff"
              />
            </TouchableOpacity>
          ),
          headerTitle: false,
          headerTransparent: true,
        }}
      />

    </ProfileParkingStack.Navigator>
  );
};

export default ProfileParkingScreen;
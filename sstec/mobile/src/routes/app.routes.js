import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
const DrawerCreate = createDrawerNavigator();
const StackCreate = createStackNavigator();

import Main from '../pages/Main/Main';
import Map from '../pages/Map/Map'
import Scheduling from '../pages/Scheduling/Scheduling';
import DrawerComponent from '../screens/Drawer';
import ProfileStackScrenn from '../screens/ProfileScreen';
import ProfileParkingScreen from '../screens/ProfileParkingScreen';
import ProfileParking from '../pages/ProfileParking/ProfileParking';

const openScree = ({ navigation }) => (
  <StackCreate.Navigator>
    <StackCreate.Screen
      name=" "
      component={Main}
      options={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.buttonHeader} activeOpacity={0.9}>
            <Icon
              name="menu-outline"
              color="#59578e"
              size={40}
            >
            </Icon>
          </TouchableOpacity>
        ),
        headerTransparent: {
          position: 'absolute',
          backgroundColor: 'transparent',
          zIndex: 100,
          top: 0,
          left: 0,
          right: 0
        },
        headerStyle: {
          backgroundColor: '#f4511e',
          height: 80,
        }
      }} />
  </StackCreate.Navigator>
);


export default function AppRoutes() {
  return (
    <DrawerCreate.Navigator drawerContent={props => <DrawerComponent {...props} />}>
      <StackCreate.Screen name="openScree" component={openScree} />
      <DrawerCreate.Screen name="Profile" component={ProfileStackScrenn} />
      <StackCreate.Screen name="Scheduling" component={Scheduling} />

      <StackCreate.Screen 
        name="ProfileParking" 
        component={ProfileParking}
        options={({route}) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff'
        })}
      />
    </DrawerCreate.Navigator>
  );
};

const styles = StyleSheet.create({
  buttonHeader: {
    padding: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginLeft: 20,
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    marginTop: Platform.OS === 'ios' ? 9 : 4.5,
  }
});
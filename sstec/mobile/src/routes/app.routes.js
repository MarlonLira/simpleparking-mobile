import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

const DrawerCreate = createDrawerNavigator();
const StackCreate = createStackNavigator();
const standardColor = '#59578e';

import Main from '../pages/Main/Main';
import Map from '../pages/Map/Map'
import Scheduling from '../pages/Scheduling/Scheduling';
import DrawerComponent from '../screens/Drawer';
import ProfileStackScrenn from '../screens/ProfileScreen';
import ProfileParkingScreen from '../screens/ProfileParkingScreen';
import ProfileParking from '../pages/ProfileParking/ProfileParking';
import SchedulingList from '../pages/Scheduling/SchedulingList';

import { useSelector } from 'react-redux'

const openScree = ({ navigation }) => {
  const { scheduling } = useSelector(state => state);

  return (
    <StackCreate.Navigator>

      <StackCreate.Screen
        name=" "
        component={Main}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.buttonHeader} activeOpacity={0.9}>
              <Icon
                name="menu-outline"
                color={standardColor}
                size={40}
              >
              </Icon>
              {
                scheduling.notification ?
                  <Material name='circle' color="#59578e" size={19} style={{ marginLeft: -20 }} />
                  : null
              }
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

      <StackCreate.Screen
        name="ProfileParking"
        component={ProfileParking}
        options={{
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff'
        }}
      />
      <StackCreate.Screen
        name="Scheduling"
        component={Scheduling}
        options={{
          title: "",
          headerTintColor: standardColor
        }} />

      <StackCreate.Screen
        name="SchedulingList"
        component={SchedulingList}
        options={{
          title: "Agendamentos",
          headerTintColor: standardColor,
          headerStyle: {
            elevation: 0,
          },
        }}
      />

    </StackCreate.Navigator>
  )
};

export default function AppRoutes() {
  return (
    <DrawerCreate.Navigator drawerContent={props => <DrawerComponent {...props} />}>
      <StackCreate.Screen name="openScree" component={openScree} />
      <StackCreate.Screen name="Profile" component={ProfileStackScrenn} />
    </DrawerCreate.Navigator>
  );
};

const styles = StyleSheet.create({
  buttonHeader: {
    flexDirection: 'row',
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
    minHeight: 20,
    minWidth: 20,
  }
});
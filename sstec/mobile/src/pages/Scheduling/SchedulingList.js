import React from 'react';
import SchedulingPrevious from './SchedulingPrevious';
import SchedulingProgress from './SchedulingProgress';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const standardColor = '#59578e';

const SchedulingList = () => {

  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 13 },
        activeTintColor: standardColor,
        indicatorStyle: {
          backgroundColor: standardColor,
        }
      }}
    >
      <Tab.Screen
        options={{
          title: "Anteriores"
        }}
        name="SchedulingPrevious"
        component={SchedulingPrevious}
      />

      <Tab.Screen
        options={{
          title: "Em andamento"
        }}
        name="SchedulingProgress"
        component={SchedulingProgress}
      />
    </Tab.Navigator>
  );
}

export default SchedulingList; 
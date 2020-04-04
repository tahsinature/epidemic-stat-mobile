import React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Home from '../../screens/Home/Home';
import Profile from '../..//screens/Profile/Profile';

import colors from '../../constants/colors';

const Tab = createMaterialBottomTabNavigator();

const bottomTab = () => (
  <Tab.Navigator initialRouteName="Home" shifting={true}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarColor: colors.primaryGrayish,
        tabBarIcon: ({color, focused}) => <Icon name="home" size={25} color={color} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarColor: colors.temp.tabProfile,
        tabBarIcon: ({color, focused}) => <Icon name="face" size={25} color={color} />,
      }}
    />
  </Tab.Navigator>
);

export default bottomTab;

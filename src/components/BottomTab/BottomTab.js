import React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Home from '../../screens/Home/Home';
import Bookmark from '../..//screens/Bookmark/Bookmark';

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
      name="Bookmarks"
      component={Bookmark}
      options={{
        tabBarColor: colors.primaryGrayish,
        tabBarIcon: ({color, focused}) => <Icon name="bookmark" size={25} color={color} />,
      }}
    />
  </Tab.Navigator>
);

export default bottomTab;

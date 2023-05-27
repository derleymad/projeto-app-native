import React from 'react';
import { RootBottomTabParamList } from './src/types/navigation';
import Feed from './src/page/feed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Interactions from './src/page/interactions';
import Profile from './src/page/profile'; 

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

export default function Authenticated() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Interactions" component={Interactions} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

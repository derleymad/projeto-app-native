import React from 'react';
import { RootBottomTabParamList } from './src/types/navigation';
import Feed from './src/page/feed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Interactions from './src/page/interactions';
import Profile from './src/page/profile'; 
import { useColorMode, useTheme } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CreatePost from './src/page/createPost';
import { useWindowDimensions } from 'react-native';

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

export default function Authenticated() {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const { width, height } = useWindowDimensions();
  const dark = colorMode === "dark";
  
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false, 
        tabBarStyle: {
          height: 77,
          backgroundColor: dark ?  "#121827" : colors.gray[50],
          borderTopColor: dark ?  "#121827" : colors.gray[50],
        },
        tabBarLabel:() => {return null},
        tabBarActiveTintColor:  dark ?  "#2EA58B" : "#47C9AD",
        tabBarInactiveTintColor:  dark ?  colors.primary[50] : "#121827",
      }} 
    >
      <Tab.Screen 
        name="Feed" 
        component={Feed} 
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="home-filled"
              color={color}
              size={width > height ? 25 : 40}
            />
          ),
        }}
      />
       <Tab.Screen 
        name="CreatePost" 
        component={CreatePost} 
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="add-box"
              color={color}
              size={width > height ? 25 : 40}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Interactions" 
        component={Interactions} 
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="comment"
              color={color}
              size={width > height ? 25 : 40}
              style={{ marginTop: 4 }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="person"
              color={color}
              size={width > height ? 25 : 40}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

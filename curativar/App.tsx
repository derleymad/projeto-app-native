import React from 'react';
import {NativeBaseProvider} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import theme from './src/assets/theme';
import Login from './src/page/login';
import Register from './src/page/register';
import Recover from './src/page/recover';
import { RootStackParamList } from './src/types/navigation';
import Authenticated from './Authenticated';
import Post from './src/page/post';
import Messages from './src/page/messages/intex';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} options={{ }}/>
          <Stack.Screen name="Register" component={Register} options={{ }}/>
          <Stack.Screen name="Recover" component={Recover} options={{ }}/>
          <Stack.Screen name="Authenticated" component={Authenticated} options={{ }}/>
          <Stack.Screen name="Post" component={Post} options={{ }}/>
          <Stack.Screen name="Messages" component={Messages} options={{ }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

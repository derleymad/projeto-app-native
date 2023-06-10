import React, { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './src/context/authContext';
import { getAxiosInstance } from './src/config/axios';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  console.log(token);

  useEffect(() => {
    const getToken = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      setToken(userToken);
    }

    getToken();
  },[]);

  const handleLogin = async (user: string, password: string, setShowError: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      if(user && password){
        if(!setToken) return

        setShowError(false);
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.post("/auth/local", {
          identifier: user,
          password: password
        });
        
        await AsyncStorage.setItem('userToken', response.data.jwt);

        setToken(response.data.jwt);
      }
    } catch (error) {
      setShowError(true);
      console.log(error);
    }
  }

  const handleLogout = async () => {
    AsyncStorage.removeItem('userToken');
    setToken(null);
  }

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <AuthContext.Provider value={{token, setToken, handleLogin, handleLogout}}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!token ? 
              <>
                <Stack.Screen name="Login" component={Login} options={{ }}/>
                <Stack.Screen name="Register" component={Register} options={{ }}/>
                <Stack.Screen name="Recover" component={Recover} options={{ }}/>
              </>
            :
              <>
                <Stack.Screen name="Authenticated" component={Authenticated} options={{ }}/>
                <Stack.Screen name="Post" component={Post} options={{ }}/>
                <Stack.Screen name="Messages" component={Messages} options={{ }}/>
              </>
            }
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

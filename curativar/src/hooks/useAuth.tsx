import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import axios from "axios";
import { THandleCreateAccountDTO, THandleLoginDTO } from "../types/useAuth";
import { baseUrl } from "../config/axios";
import { IAuthUser } from "../types/user";

export default function useAuth() {
  const [user, setUser] = useState<IAuthUser | null>(null);

  useEffect(() => {
    const getToken = async () => {
      const userData = await AsyncStorage.getItem('user');

      const userObject = userData ? JSON.parse(userData) : null;

      setUser(userObject);
    }

    getToken();
  },[]);

  const handleLogin = async ({ user: email, password, setShowError }: THandleLoginDTO) => {
    try {
      if(email && password){
        if(!setUser) return

        setShowError(false);
        const { data } = await axios.post(`${baseUrl}/auth/local`, {
          identifier: email,
          password
        });

        const { jwt, user } = data;

        const currentUser = {
          token: jwt,
          name: user.name,
          id: user.id 
        }
        
        await AsyncStorage.setItem('user', JSON.stringify(currentUser));

        setUser(currentUser);
      }
    } catch (error) {
      setShowError(true);
    }
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  }

  const handleCreateAccount = async ({
    form,
    imageId,
    onError,
    handleDivergentPassword,
  }:THandleCreateAccountDTO) => {
    const {
      type,
      name,
      email,
      password,
      confirmPassword,
    } = form;

    if (password !== confirmPassword) {
      handleDivergentPassword();
      return;
    }

    try {
      const body = {
        username: email,
        name,
        email,
        type,
        password,
        profile_pic: imageId,
      };

      const { data } = await axios.post(`${baseUrl}/auth/local/register`, body);
      const { jwt, user: userStorage } = data;

      const currentUser = {
        token: jwt,
        name: userStorage.name,
        id: userStorage.id 
      }

      await AsyncStorage.setItem('user', JSON.stringify(currentUser));

      setUser(currentUser);
    } catch (error) {
      onError();
    }
  }

  return {
    user,
    setUser,
    handleLogin,
    handleLogout,
    handleCreateAccount,
  }
}
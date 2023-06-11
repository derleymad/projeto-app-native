import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { THandleCreateAccountDTO, THandleLoginDTO } from "../types/useAuth";
import { baseUrl, getAxiosInstance } from "../config/axios";
import axios from "axios";

export default function useAuth() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      setToken(userToken);
    }

    getToken();
  },[]);

  const handleLogin = async ({ user, password, setShowError }: THandleLoginDTO) => {
    try {
      if(user && password){
        if(!setToken) return

        setShowError(false);
        const axiosInstance = await getAxiosInstance();
        const { data } = await axiosInstance.post("/auth/local", {
          identifier: user,
          password: password
        });

        const { jwt } = data;
        
        await AsyncStorage.setItem('userToken', jwt);

        setToken(jwt);
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
        image_id: imageId,
      };

      const { data } = await axios.post(`${baseUrl}/auth/local/register`, body);
      const { jwt } = data;
      setToken(jwt);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      onError();
    }
  }

  return {
    token,
    setToken,
    handleLogin,
    handleLogout,
    handleCreateAccount,
  }
}
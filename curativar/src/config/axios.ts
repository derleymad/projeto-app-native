import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const baseUrl = "http://192.168.1.12:1337/api";
const axiosInstance = axios.create({ baseURL: baseUrl });

export async function getAxiosInstance(){
  try {
    const token = await AsyncStorage.getItem("userToken");

    if(token !== null) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return axiosInstance
  } catch(e) {
    return axiosInstance
  }
}
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const baseUrl = "http://192.168.1.12:1337/api";
const axiosInstance = axios.create({ baseURL: baseUrl });

export async function getAxiosInstance(){
  try {
    const user = await AsyncStorage.getItem("user");
    
    if(user !== null) {
      const parseUser = JSON.parse(user);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${parseUser.token}`;
    }
    
    return axiosInstance
  } catch(e) {
    return axiosInstance
  }
}
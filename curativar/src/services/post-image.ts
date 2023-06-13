import { ImagePickerResponse } from "react-native-image-picker";
import { baseUrl, getAxiosInstance } from "../config/axios";

export const postImage = async (imageAssets: ImagePickerResponse) => {
  const { assets } = imageAssets;
    
  if(!assets) return;
  const [ file ] = assets;
  let formData = new FormData();
  formData.append('files', { uri: file.uri, name: file.fileName, type: file.type });

  try {
    const axios = await getAxiosInstance();
    const { data } = await axios.post(`/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    return data;
  } catch(error) {
    console.error(JSON.stringify(error, null, 2));
    return null;
  }
}
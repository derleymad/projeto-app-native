import { ImagePickerResponse } from "react-native-image-picker";
import { getAxiosInstance } from "../config/axios";

const postImage = async (imageAssets: ImagePickerResponse) => {
  const { assets } = imageAssets;
    
  if(!assets) return null;
  const [ file ] = assets;
  const formData = new FormData();
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

export default postImage;
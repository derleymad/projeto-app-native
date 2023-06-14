import { getAxiosInstance } from "../config/axios";

const removeImage = async (id: number) => {
  try {
    const axios = await getAxiosInstance();
    const { data } = await axios.delete(`/upload/files/${id}`);

    return data;
  } catch(error) {
    console.error(JSON.stringify(error, null, 2));
    return null;
  }
}

export default removeImage;
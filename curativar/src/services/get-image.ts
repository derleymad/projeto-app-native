import { getAxiosInstance } from "../config/axios";

export async function getImage(imageId: string) {
  const axios = await getAxiosInstance();

  try {
    const { data } = await axios.get(`upload/files/${imageId}`);

    return data;
  } catch(error) {
    console.error(error);
  }
}
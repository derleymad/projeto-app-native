import { getAxiosInstance } from "../config/axios";

export const getUserPosts = async (id: number) => {
  try {
    const axios = await getAxiosInstance();
    const postsResponse = await axios.get('/posts',{
        params: {
          "filters[users_permissions_user][id][$eq]": id,
          "populate[0]": "image",
        }
      }
    );

    return postsResponse.data.data
  } catch (error) {
    console.log(error);
    return [];
  }
}
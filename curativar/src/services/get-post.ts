import { getAxiosInstance } from "../config/axios";

export const getPost = async (id: number) => {
  try {
    const axios = await getAxiosInstance();
    const postsResponse = await axios.get(`/posts/${id}`,{
        params: {
          "populate[0]": "image",
          "populate[1]": "message", 
          "populate[2]": "patient",
          "populate[3]": "users_permissions_user.profile_pic",
        }
      }
    );
    
    return postsResponse.data.data
  } catch (error) {
    console.log(error);
    return null;
  }
}
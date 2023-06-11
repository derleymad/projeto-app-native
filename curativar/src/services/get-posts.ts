import { getAxiosInstance } from "../config/axios";

export const getPosts = async () => {
  try {
    const axios = await getAxiosInstance();
    const postsResponse = await axios.get('/posts',{
        params: {
          "populate[0]": "message", 
          "populate[1]": "patient",
          "populate[2]": "users_permissions_user.profile_pic",
          "populate[3]": "image",
        }
      }
    );
    
    return postsResponse.data.data
  } catch (error) {
    console.log(error);
    return [];
  }
}
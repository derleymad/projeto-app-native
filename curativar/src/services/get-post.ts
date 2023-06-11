import { getAxiosInstance } from "../config/axios";

export const getPost = async (id: number) => {
  try {
    const axios = await getAxiosInstance();
    const postsResponse = await axios.get(`/posts/${id}`,{
        params: {
          "populate[0]": "message", 
          "populate[1]": "patient",
          "populate[2]": "users_permissions_user.profile_pic",
          "populate[3]": "image",
        }
      }
    );

    console.log(JSON.stringify(postsResponse.data, null, 2));
    
    return postsResponse.data.data
  } catch (error) {
    console.log(error);
    return null;
  }
}
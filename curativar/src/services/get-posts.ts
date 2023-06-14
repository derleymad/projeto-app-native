import { getAxiosInstance } from "../config/axios";

const getPosts = async (page: number) => {
  try {
    const axios = await getAxiosInstance();
    const postsResponse = await axios.get(
      `/posts?pagination[pageSize]=10&pagination[page]=${page}&sort[0]=createdAt%3Adesc`,
      {
        params: {
          "populate[0]": "users_permissions_user.profile_pic",
          "populate[1]": "image",
        }
      }
    );
    
    return postsResponse.data
  } catch (error) {
    console.log(error);
    return {
      data: [], 
      meta: {
        "pagination": {
          "page": 0,
          "pageSize": 0,
          "pageCount": 0,
          "total": 0
        }
      }
    }
  }
}

export default getPosts;

import { getAxiosInstance } from "../config/axios";

const getInteractions = async (page: number, userId: number) => {
  try {
    const axios = await getAxiosInstance();
    const postsResponse = await axios.get(
      `/posts`,
      {
        params: {
          "pagination[pageSize]": 10,
          "pagination[page]": page,
          "filters[messages][users_permissions_user][id][$eq]": userId,
          "populate[0]": "users_permissions_user.profile_pic",
          "populate[1]": "image",
          "sort[0]":" createdAt%3Adesc",
        }
      }
    );
    
    return postsResponse.data
  } catch (error) {
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

export default getInteractions;
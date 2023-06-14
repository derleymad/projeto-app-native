import { getAxiosInstance } from "../config/axios";
import { IMessageResponse } from "../types/messageResponse";

export const getMessages = async (postId: number): Promise<IMessageResponse> => {
  try {
    const axios = await getAxiosInstance();
    const postsResponse = await axios.get(
      `/messages`,
      {
        params: {
          "pagination[pageSize]": 3000,
          "filters[post][id][$eq]": postId,
          "populate[0]": "users_permissions_user.profile_pic",
        }
      }
    );
    
    return postsResponse.data
  } catch (error) {
    console.log(error);
    return {
      data: [],
      "meta": {
        "pagination": {
          "page": 0,
          "pageSize": 0,
          "pageCount": 0,
          "total": 0
        }
      }
    };
  }
}
import { getAxiosInstance } from "../config/axios";

interface IPostMessageProps {
  message: string,
  userId: number, 
  postId: number,
}

export const postMessage = async ({ message, userId, postId }: IPostMessageProps) => {
  try {
    const axiosInstance = await getAxiosInstance();
    const postResponse = await axiosInstance.post("/messages", {
      data: {
        message: message,
        post: postId,
        users_permissions_user: userId
      }
    })

    console.log(postResponse.data);

    return postResponse.data.data;
  } catch(error) {
    console.error(error);
    return null;
  }
}
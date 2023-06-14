import { getAxiosInstance } from "../config/axios";

interface IPostPostPros {
  description: string, 
  userId: number, 
  imageId: number,
  patient_id: number
}

export const postPost = async ({description, userId, imageId, patient_id}: IPostPostPros) => {
  try {
    const axiosInstance = await getAxiosInstance();
    const postResponse = await axiosInstance.post("/posts", {
      data: {
        description: description,
        image: imageId,
        patient: patient_id,
        users_permissions_user: userId
      }
    })

    return postResponse;
  } catch(error) {
    console.error(error);
    return null;
  }
}
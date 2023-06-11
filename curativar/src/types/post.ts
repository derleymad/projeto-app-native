import { IPicture } from "./picture"

export interface IPost {
  "id": number,
  "attributes": {
    "description": string,
    "publishedAt": string,
    "messages": {data: any},
    "patient": {data: any},
    "image": {data: {id: number, attributes: Omit<IPicture, "id"> }},
    "users_permissions_user": {
      "data": {
        "id": number,
        "attributes": {
          "profile_pic": {data: IPicture},
          "name": string
        }
      }
    }
  }
}
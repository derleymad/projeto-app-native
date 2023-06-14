import { IPicture } from "./picture"

export interface IAuthUser {
  token: string
  id: number,
  name: string
}

export interface IUser extends Omit<IAuthUser, "token"> {
  "username": string,
  "email": string,
  "provider": string,
  "confirmed": boolean,
  "blocked": boolean,
  "createdAt": string,
  "updatedAt": string,
  "Type": string,
  "profile_pic": IPicture | null
}


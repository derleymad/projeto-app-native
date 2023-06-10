import { ReactNode, createContext, useEffect, useState } from "react";
import { getAxiosInstance } from "../config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextProps{
  token?: string | null;
  setToken?: React.Dispatch<React.SetStateAction<string | null>>;
  handleLogin?: (user: string, password: string, setShowError: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>
  handleLogout?: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({});
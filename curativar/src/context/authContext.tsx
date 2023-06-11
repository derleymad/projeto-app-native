import { createContext } from "react";
import { THandleCreateAccountDTO, THandleLoginDTO } from "../types/useAuth";

interface AuthContextProps{
  token?: string | null;
  setToken?: React.Dispatch<React.SetStateAction<string | null>>;
  handleLogin?: (loginProps: THandleLoginDTO) => Promise<void>
  handleLogout?: () => Promise<void>;
  handleCreateAccount?: (createProps: THandleCreateAccountDTO) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({});
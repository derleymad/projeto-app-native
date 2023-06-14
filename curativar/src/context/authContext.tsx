import { createContext } from "react";
import { THandleCreateAccountDTO, THandleLoginDTO } from "../types/useAuth";
import { IAuthUser } from "../types/user";

interface AuthContextProps{
  user?: IAuthUser | null;
  setUser?: React.Dispatch<React.SetStateAction<IAuthUser | null>>;
  handleLogin?: (loginProps: THandleLoginDTO) => Promise<void>
  handleLogout?: () => Promise<void>;
  handleCreateAccount?: (createProps: THandleCreateAccountDTO) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({});
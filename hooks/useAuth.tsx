import axios from "axios";
import React, {
  createContext,
  useContext,
  ReactNode,
  ReactElement,
  useState,
} from "react";

interface IAuthState {
  token: string;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  verifySession: () => Promise<boolean>;
  signout: () => void;
}

const AuthContext = createContext<IAuthState | undefined>(undefined);

const useAuth = (): IAuthState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = (props: { children: ReactNode }): ReactElement => {
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const verifySession = async (): Promise<boolean> => {
    setIsLoading(true);
    if (!token) {
      setIsLoading(false);
      return false;
    }

    try {
      const response = await axios.post("http://localhost:4001/verify", {
        token: token,
      });

      if (response.status === 200) {
        setIsLoading(false);
        return true;
      } else {
        console.log("Token invalid");
        setToken("");
      }
    } catch (error) {
      console.log(error);
      setToken("");
    }

    setIsLoading(false);
    return false;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:4001/login", {
        email: email,
        password: password,
      });

      const tempToken = response.data.token;
      if (tempToken) {
        setToken(tempToken);
        setIsLoading(false);
        return true;
      } else {
        console.log("No token received");
        setToken("");
      }
    } catch (error) {
      console.log(error);
      setToken("");
    }

    setIsLoading(false);
    return false;
  };

  const signout = () => {
    setToken("");
  };

  return (
    <AuthContext.Provider
      {...props}
      value={{ token, login, verifySession, signout, isLoading }}
    />
  );
};

export { AuthProvider, useAuth };

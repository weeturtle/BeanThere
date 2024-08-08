import axios, { AxiosInstance } from "axios";
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
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  verifySession: () => Promise<boolean>;
  signout: () => void;
  axiosClient: AxiosInstance;
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

  // Only include auth header if token is present

  const axiosClient = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const verifySession = async (): Promise<boolean> => {
    setIsLoading(true);
    if (!token) {
      setIsLoading(false);
      return false;
    }

    try {
      const response = await axiosClient.post("/auth/verify");

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
      const response = await axiosClient.post("/auth/login", {
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

  const signup = async (
    email: string,
    password: string,
    name: string,
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await axiosClient.post("/user/signup", {
        email: email,
        name: name,
        password: password,
      });

      if (response.status === 200) {
        setIsLoading(false);
        setToken(response.data.token);
        return true;
      } else {
        console.log("Signup failed");
      }
    } catch (error) {
      console.log(error);
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
      value={{
        token,
        login,
        verifySession,
        signout,
        isLoading,
        signup,
        axiosClient,
      }}
    />
  );
};

export { AuthProvider, useAuth };

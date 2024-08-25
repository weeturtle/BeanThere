import { VERIFY } from "@/constants/mutations/auth";
import { useMutation } from "@apollo/client";
import { router } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

interface VerifyRequest {
  token: string;
}

interface VerifyResponse {
  verify: boolean;
}

interface Context {
  signIn: (token: string) => void;
  signOut: () => void;
  verifyToken: () => void;
  token: string;
}

const AuthContext = createContext<Context>({
  signIn: () => {},
  signOut: () => {},
  verifyToken: () => {},
  token: "",
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>("");

  const clearToken = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  const signIn = (token: string) => {
    clearToken();
    localStorage.setItem("token", token);
    setToken(token);
  };

  const signOut = () => {
    clearToken();
    router.replace("/login");
  };

  const [verify] = useMutation<VerifyResponse, VerifyRequest>(VERIFY, {
    onCompleted: (data) => {
      console.log(data);
      if (!data.verify) {
        signOut();
      }
    },
  });

  const verifyToken = async (): Promise<boolean> => {
    try {
      const response = await verify({
        variables: {
          token: localStorage.getItem("token") || "",
        },
      });

      if (!response.data) {
        signOut();
        return false;
      }

      setToken(localStorage.getItem("token") || "");
      return true;
    } catch (error) {
      signOut();
      return false;
    }
  };

  const contextValue = useMemo(
    () => ({
      signIn,
      signOut,
      verifyToken,
      token,
    }),
    [signIn, signOut, token],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default AuthProvider;

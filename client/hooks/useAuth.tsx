import { VERIFY } from "@/constants/mutations/auth";
import { useMutation } from "@apollo/client";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

export const storeToken = async (value: string) => {
  try {
    await AsyncStorage.setItem("token", value);
  } catch (e) {
    console.error(e);
  }
};

export const retrieveToken = async () => {
  try {
    const value = await AsyncStorage.getItem("token");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error(e);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (e) {
    console.error(e);
  }
};

const AuthContext = createContext<Context>({
  signIn: () => {},
  signOut: () => {},
  verifyToken: () => {},
  token: "",
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>("");

  const clearToken = async () => {
    await removeToken();
    setToken("");
  };

  const signIn = async (token: string) => {
    clearToken();
    await storeToken(token);
    setToken(token);
  };

  const signOut = async () => {
    await clearToken();
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
      const token = await retrieveToken();
      const response = await verify({
        variables: {
          token: token || "",
        },
      });

      if (!response.data) {
        signOut();
        return false;
      }

      // setToken(localStorage.getItem("token") || "");
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

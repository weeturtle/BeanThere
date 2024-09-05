import { useLazyQuery, useMutation } from "@apollo/client";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { VERIFY } from "@/constants/queries/auth";

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

  const [verify, { error }] = useLazyQuery<VerifyResponse>(VERIFY, {
    onCompleted: (data) => {
      console.log(`Data from verify query: ${data.verify}`);
    },
    errorPolicy: "all",
    pollInterval: 0,
  });

  const verifyToken = async (): Promise<boolean> => {
    console.group("Auth: VerifyToken");

    console.log("Fetching token from local storage");
    const token = await retrieveToken();
    console.log(`Token from storage: ${token}`);

    const errorVerificating = (message: string): false => {
      console.log(message);
      signOut();
      console.log("Signed out");
      console.groupEnd();
      return false;
    };

    if (!token) {
      console.log("No token found in storage");
      return errorVerificating("No token found in storage");
    }

    console.log("Verifying token with auth service");
    const response = await verify();

    if (error) {
      return errorVerificating("Error verifying token");
    }

    if (!response.data || !response.data.verify) {
      return errorVerificating("Auth service couldn't verify token");
    }

    console.log("No errors authenticating token");
    console.groupEnd();
    return true;
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

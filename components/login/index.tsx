import { LOGIN } from "@/constants/mutations/auth";
import { useMutation } from "@apollo/client";
import { router } from "expo-router";
import LoginView from "./Login";
import React from "react";
import { useAuth } from "@/hooks/useAuth";

interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse {
  login: {
    token: string;
  };
}

const Login = () => {
  const { signIn } = useAuth();

  const [login, { error, loading }] = useMutation<
    ILoginResponse,
    ILoginRequest
  >(LOGIN, {
    onCompleted: (data) => {
      const {
        login: { token },
      } = data;
      console.log(data);
      signIn(token);
      router.replace("/");
    },
  });

  const handleLogin = (email: string, password: string) => {
    login({
      variables: {
        email,
        password,
      },
    });
  };

  return <LoginView onLogin={handleLogin} loading={loading} error={error} />;
};

export default Login;

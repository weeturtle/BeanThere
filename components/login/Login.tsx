import React, { useState } from "react";
import { ApolloError } from "@apollo/client";
import { Pressable, TextInput, Text, View } from "react-native";

interface LoginProps {
  error?: ApolloError;
  loading: boolean;
  onLogin: (email: string, password: string) => void;
}

const LoginView = ({ error, loading, onLogin }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Pressable onPress={() => onLogin(email, password)}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
};

export default LoginView;

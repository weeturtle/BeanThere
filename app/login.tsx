import { useAuth } from "@/hooks/useAuth";
import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, token } = useAuth();

  const handleLogin = async () => {
    console.log(`Logging in`);
    const success = await login(email, password);

    console.log(`Success: ${success}`);
    if (success) {
      router.replace("/");
    }
  };

  useEffect(() => {
    if (token) {
      router.replace("/");
    }

    console.log(`Token: ${token}`);
  }, [token]);

  return (
    <View>
      <Text>Email</Text>
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
        }}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <Text>Password</Text>
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
        }}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <Pressable onPress={handleLogin}>
        <Text>Login</Text>
      </Pressable>

      <Link href="/signup">
        <Text>Register</Text>
      </Link>
      <Text>{token}</Text>
    </View>
  );
};

export default LoginPage;

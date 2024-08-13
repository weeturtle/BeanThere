import Login from "@/components/login";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const LoginPage = () => {
  return (
    <View>
      <Login />
      <Link href="/signup">
        <Text>Register</Text>
      </Link>
    </View>
  );
};

export default LoginPage;

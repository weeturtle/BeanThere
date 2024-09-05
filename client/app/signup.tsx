import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import Signup from "@/components/signup";

const SignupPage = () => {
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, [token]);

  return (
    <View>
      <Signup />
    </View>
  );
};

export default SignupPage;

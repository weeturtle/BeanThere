import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signup } = useAuth();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (await signup(email, password, name)) {
      router.replace("/");
    }
  };

  return (
    <View>
      <Text>Signup</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Pressable onPress={handleSignup}>
        <Text>Signup</Text>
      </Pressable>
    </View>
  );
};

export default SignupPage;

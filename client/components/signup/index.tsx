import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import SignupAction from "./signupFunc";
import SubmitButton from "./submitButton";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signup, loading, error } = SignupAction();

  const handleSignup = () => {
    signup({
      variables: {
        name,
        email,
        password,
      },
    });
  };

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Signup</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
      />
      <SubmitButton
        password={password}
        confirmPassword={confirmPassword}
        onPress={handleSignup}
      />
    </View>
  );
};

export default Signup;

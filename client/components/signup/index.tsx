import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import SignupAction from "./signupFunc";
import SubmitButton from "./submitButton";
import { Link } from "expo-router";

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
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.inputBox}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.inputBox}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
        style={styles.inputBox}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
        style={styles.inputBox}
      />
      <SubmitButton
        password={password}
        confirmPassword={confirmPassword}
        onPress={handleSignup}
      />
      <Link href={"/login"} style={styles.loginButton}>
        <Text>Login</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  inputBox: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
  },

  loginButton: {
    width: "50%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
});
export default Signup;

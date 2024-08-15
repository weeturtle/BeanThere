import React, { useState } from "react";
import { ApolloError } from "@apollo/client";
import { Pressable, TextInput, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

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
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.inputBox}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.inputBox}
      />

      <Pressable
        onPress={() => onLogin(email, password)}
        style={styles.loginButton}
      >
        <Text>Login</Text>
      </Pressable>
      <Link href="/signup" style={styles.registerButton}>
        <Text>Register</Text>
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

  registerButton: {
    width: "50%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
});

export default LoginView;

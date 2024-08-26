import React from "react";
import Login from "@/components/login";
import { View, StyleSheet, Text } from "react-native";

const LoginPage = () => {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "60%",
    width: "100%",
  },
});

export default LoginPage;

import Login from "@/components/login";
import React from "react";
import { View, StyleSheet } from "react-native";

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

import React from "react";
import { Slot } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/components/apollo";
import AuthProvider from "@/hooks/useAuth";

const RootLayout = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E0D7CF",
  },
});

export default RootLayout;

import { client } from "@/components/apollo";
import AuthProvider from "@/hooks/useAuth";
import { ApolloProvider } from "@apollo/client";
import { Slot } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </ApolloProvider>
  );
};

export default RootLayout;

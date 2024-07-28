import { AuthProvider } from "@/hooks/useAuth";
import { Slot } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default RootLayout;

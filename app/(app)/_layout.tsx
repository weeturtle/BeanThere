import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import Footer from "@/components/footer";
import { Pressable, Text } from "react-native";

const AppLayout = () => {
  const { verifyToken, token } = useAuth();

  useEffect(() => {
    verifyToken();
  }, [token]);

  return (
    <>
      <Stack />
      <Pressable onPress={verifyToken}>
        <Text>Verify Token</Text>
      </Pressable>
      <Footer />
    </>
  );
};

export default AppLayout;

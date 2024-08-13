import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import Footer from "@/components/footer";

const AppLayout = () => {
  const { verifyToken, token } = useAuth();

  useEffect(() => {
    verifyToken();
  }, [token]);

  return (
    <>
      <Stack />
      <Footer />
    </>
  );
};

export default AppLayout;

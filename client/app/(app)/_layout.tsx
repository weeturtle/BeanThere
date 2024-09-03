import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import Footer from "@/components/footer";

const AppLayout = () => {
  // const { verifyToken, token } = useAuth();

  // useEffect(() => {
  //   console.log("Dashboard layout: Checking if user is logged in");
  //   verifyToken();
  // }, [token]);

  return (
    <>
      <Stack />
      <Footer />
    </>
  );
};

export default AppLayout;

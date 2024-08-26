import React from "react";
import { Text } from "react-native";
import HeaderContainer from ".";
import { Link } from "expo-router";

const DashboardHeader = () => {
  return (
    <HeaderContainer>
      <Text>Back</Text>
      <Text>Home</Text>
      <Link href={`/review`}>Add</Link>
    </HeaderContainer>
  );
};

export default DashboardHeader;

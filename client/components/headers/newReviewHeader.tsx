import React from "react";
import { Text, Image } from "react-native";
import HeaderContainer from ".";
import { Link } from "expo-router";

const NewReviewHeader = () => {
  return (
    <HeaderContainer>
      <Link href="/">
        <Image source={require("../../assets/icons/cancel.svg")} />
      </Link>
      <Text>New Post</Text>
      <Image source={require("../../assets/icons/plus.svg")} />
    </HeaderContainer>
  );
};

export default NewReviewHeader;

import React from "react";
import { Text, Image, Pressable } from "react-native";
import HeaderContainer from ".";
import { Link } from "expo-router";

interface NewReviewHeaderProps {
  submit: () => void;
}

const NewReviewHeader = ({ submit }: NewReviewHeaderProps) => {
  return (
    <HeaderContainer>
      <Link href="/">
        <Image source={require("../../assets/icons/cancel.svg")} />
      </Link>
      <Text>New Post</Text>
      <Pressable onPress={submit}>
        <Image source={require("../../assets/icons/plus.svg")} />
      </Pressable>
    </HeaderContainer>
  );
};

export default NewReviewHeader;

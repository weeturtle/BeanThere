import React from "react";
import { Text, Image, StyleSheet } from "react-native";
import HeaderContainer from ".";
import { Link } from "expo-router";

const DashboardHeader = () => {
  return (
    <HeaderContainer>
      <Link href={`/review`}>
        <Image source={require("../../assets/icons/plus.svg")} />
      </Link>
      <Text style={styles.title}>Home</Text>
      <Link href={`/messages`}>
        <Image source={require("../../assets/icons/message.svg")} />
      </Link>
    </HeaderContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default DashboardHeader;

import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";

const ProfilePage = () => {
  return (
    <View>
      <Text>Profile Page</Text>
      <Link href="/profile/starredCafes">
        <Text>Starred Cafes</Text>
      </Link>
    </View>
  );
};

export default ProfilePage;

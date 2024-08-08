import React from "react";
import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

const ProfilePage = () => {
  const { signout } = useAuth();

  return (
    <View>
      <Text>Profile Page</Text>
      <Link href="/friends">
        <Text>See Friends</Text>
      </Link>

      <Pressable onPress={signout}>
        <Text>Sign out</Text>
      </Pressable>
    </View>
  );
};

export default ProfilePage;

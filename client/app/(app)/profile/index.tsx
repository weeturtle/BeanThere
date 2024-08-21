import React from "react";
import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

const ProfilePage = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <Text>Profile Page</Text>
      <Link href="/friends">
        <Text>See Friends</Text>
      </Link>

      <Link href="/(app)/profile/posts">
        <Text>My Posts</Text>
      </Link>

      <Pressable onPress={signOut}>
        <Text>Sign out</Text>
      </Pressable>
    </View>
  );
};

export default ProfilePage;

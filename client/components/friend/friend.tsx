import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { UserItem } from "./innerSearchBox";
import { useMutation } from "@apollo/client";
import { FOLLOW_USER, UNFOLLOW_USER } from "@/constants/mutations/friend";

interface UserProps {
  user: UserItem;
}

const UserOption = ({ user }: UserProps) => {
  const handleClick = () => {
    if (user.isFriend) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const handleFollow = () => {
    useMutation(FOLLOW_USER, {
      variables: {
        userId: user.user.id,
      },
    });

    user.isFriend = true;
  };

  const handleUnfollow = () => {
    useMutation(UNFOLLOW_USER, {
      variables: {
        userId: user.user.id,
      },
    });

    user.isFriend = false;
  };

  return (
    <View style={styles.container} key={user.user.id}>
      <Text>{user.user.name}</Text>
      <Pressable style={styles.button} onPress={handleClick}>
        <Text>{user.isFriend ? "Unfollow" : "Follow"}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "60%",
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    width: 80,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserOption;

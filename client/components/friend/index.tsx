import React from "react";
import { ALLFRIENDS } from "@/constants/queries/friends";
import { useSuspenseQuery } from "@apollo/client";
import { View, Text } from "react-native";
import { Link } from "expo-router";

interface FriendsResponse {
  user: {
    Friends: {
      id: string;
      name: string;
    }[];
  };
}

const FriendsView = () => {
  const { data, error } = useSuspenseQuery<FriendsResponse>(ALLFRIENDS);

  console.log(data);

  if (error) {
    return <Text>Error! {error.message}</Text>;
  }

  if (data.user.Friends.length === 0) {
    return (
      <View>
        <Text>You have no friends</Text>
      </View>
    );
  }

  return (
    <View>
      {data.user.Friends.map(({ id, name }) => (
        <Link key={id} href={`/profile/${id}`}>
          <Text>{name}</Text>
        </Link>
      ))}
    </View>
  );
};

export default FriendsView;

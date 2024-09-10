import { FRIENDSEARCH } from "@/constants/queries/friends";
import { useSuspenseQuery } from "@apollo/client";
import React from "react";
import { Text, View } from "react-native";

interface InnerSearchBoxProps {
  prompt: string;
}

interface FriendSearchResponse {
  searchUser: {
    user: {
      id: string;
      name: string;
    };
    isFriend: boolean;
  }[];
}

interface FriendSearchRequest {
  prompt: string;
}

const InnerSearchBox = ({ prompt }: InnerSearchBoxProps) => {
  const { data, error } = useSuspenseQuery<
    FriendSearchResponse,
    FriendSearchRequest
  >(FRIENDSEARCH, {
    variables: { prompt },
    skip: !prompt,
  });

  if (error) {
    return <Text>Error</Text>;
  }

  return (
    <View>
      {data &&
        data.searchUser.map((friend) => (
          <Text key={friend.user.id}>{friend.user.name}</Text>
        ))}
    </View>
  );
};

export default InnerSearchBox;

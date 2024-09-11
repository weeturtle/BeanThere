import React from "react";
import { Text, View } from "react-native";
import { useSuspenseQuery } from "@apollo/client";
import { FRIENDSEARCH } from "@/constants/queries/friends";
import UserOption from "./friend";

interface InnerSearchBoxProps {
  prompt: string;
}

export interface UserItem {
  user: {
    id: string;
    name: string;
  };
  isFriend: boolean;
}

interface FriendSearchResponse {
  searchUser: UserItem[];
}

interface FriendSearchRequest {
  prompt: string;
}

const InnerSearchBox = ({ prompt }: InnerSearchBoxProps) => {
  const { data, error, refetch } = useSuspenseQuery<
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
        data.searchUser.map((user) => (
          <UserOption key={user.user.id} user={user} />
        ))}
    </View>
  );
};

export default InnerSearchBox;

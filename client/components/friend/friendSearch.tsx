import { FRIENDSEARCH } from "@/constants/queries/friends";
import { useLazyQuery, useQuery, useSuspenseQuery } from "@apollo/client";
import React, { useState, Suspense } from "react";
import { View, TextInput, Text } from "react-native";

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

const FriendSearch = () => {
  const [search, setSearch] = useState<string>("");

  // const [friends, { data, loading, error, refetch }] = useLazyQuery<
  const { data, refetch, error } = useQuery<
    FriendSearchResponse,
    FriendSearchRequest
  >(FRIENDSEARCH, {
    variables: { prompt: search },
    skip: !search,
  });

  return (
    <View>
      <TextInput
        placeholder="Search for a friend"
        value={search}
        onChangeText={setSearch}
      />
      <Suspense fallback={<Text>Loading...</Text>}>
        {data &&
          data.searchUser.map((friend) => (
            <View key={friend.user.id}>
              <Text>{friend.user.name}</Text>
            </View>
          ))}
      </Suspense>
    </View>
  );
};

export default FriendSearch;

import { FRIENDSEARCH } from "@/constants/queries/friends";
import { useLazyQuery, useQuery, useSuspenseQuery } from "@apollo/client";
import React, { useState, Suspense, useEffect } from "react";
import { View, TextInput, Text } from "react-native";
import InnerSearchBox from "./innerSearchBox";

const FriendSearch = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <View>
      <TextInput
        placeholder="Search for a friend"
        value={search}
        onChangeText={setSearch}
      />
      <Suspense fallback={<Text>Loading...</Text>}>
        <InnerSearchBox prompt={search} />
      </Suspense>
    </View>
  );
};

export default FriendSearch;

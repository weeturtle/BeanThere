import FriendsView from "@/components/friend";
import FriendSearch from "@/components/friend/friendSearch";
import React, { Suspense } from "react";
import { View, Text } from "react-native";

const FriendsPage = () => {
  return (
    <View>
      <Text>Friends Page</Text>
      <FriendSearch />
      <Suspense fallback={<View>Loading</View>}>
        <FriendsView />
      </Suspense>
    </View>
  );
};

export default FriendsPage;

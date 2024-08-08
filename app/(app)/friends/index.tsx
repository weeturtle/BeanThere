import FriendSearch from "@/components/friend";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

interface IFriend {
  id: string;
  email: string;
  name: string;
}

const FriendsPage = () => {
  const [friends, setFriends] = useState<IFriend[]>([]);
  const { axiosClient } = useAuth();

  const useFetchFriends = async () => {
    const response = await axiosClient.get<IFriend[]>("/friend");
    setFriends(response.data);
  };

  useEffect(() => {
    useFetchFriends();
  }, []);

  return (
    <View>
      <Text>Friends Page</Text>
      {friends.map((friend) => (
        <Text key={friend.id}>{friend.name}</Text>
      ))}

      <FriendSearch />
    </View>
  );
};

export default FriendsPage;

import { useAuth } from "@/hooks/useAuth";
import React, {
  useState,
  useEffect,
  Suspense,
  Dispatch,
  SetStateAction,
} from "react";
import {
  View,
  TextInput,
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Pressable,
} from "react-native";

interface IFriend {
  id: string;
  name: string;
  isFriend: boolean;
}

// How do i add a debounce to this component? copilot answer below

const FriendSearch = () => {
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState<IFriend[]>([]);

  const { axiosClient } = useAuth();

  const handleChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setSearch(event.nativeEvent.text);
  };

  useEffect(() => {
    const fetchFriends = async () => {
      if (!search) {
        setFriends([]);
        return;
      }

      const response = await axiosClient.get<IFriend[]>(
        `/friend/find?search=${search}`,
      );
      const friends = response.data;

      console.log(friends);
      setFriends(friends);
    };
    fetchFriends();
  }, [search]);

  const modifyFriend = async (id: string, isFriend: boolean) => {
    if (!isFriend) {
      console.log("Adding friend");
      await axiosClient.post(`/friend`, {
        friend_id: id,
      });
    } else {
      console.log("Removing friend");
      await axiosClient.delete(`/friend/${id}`);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Search for a friend"
        value={search}
        onChange={handleChange}
      />
      <Suspense fallback={<Text>Loading...</Text>}>
        {friends.map((friend) => (
          <View key={friend.id}>
            <Text>{friend.name}</Text>
            <Pressable onPress={() => modifyFriend(friend.id, friend.isFriend)}>
              <Text>{friend.isFriend ? "Unfriend" : "Add"}</Text>
            </Pressable>
          </View>
        ))}
      </Suspense>
    </View>
  );
};

export default FriendSearch;

// How could we improve this component?
// 1. Add a debounce to the input
// 2. Add a loading state
// 3. Add a way to select a friend
// 4. Add a way to add a friend

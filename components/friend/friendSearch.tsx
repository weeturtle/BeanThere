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
}

const FriendSearch = () => {
  const [search, setSearch] = useState<string>("");
  const [friends, setFriends] = useState<IFriend[]>([]);

  const handleChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ): void => {
    setSearch(e.nativeEvent.text);
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
          </View>
        ))}
      </Suspense>
    </View>
  );
};

export default FriendSearch;

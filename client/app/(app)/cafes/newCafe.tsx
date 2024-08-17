import { ADDCAFE } from "@/constants/mutations/cafe";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Text, Pressable, TextInput, View } from "react-native";

const NewCafePage = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");

  const [add, { error, loading }] = useMutation(ADDCAFE, {
    onCompleted: () => {
      console.log("Cafe added");
    },
    onError: () => {
      console.log("Error adding cafe");
    },
  });

  const addCafe = () => {
    add({
      variables: {
        name,
        address,
        description,
        city,
      },
    });
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput placeholder="City" value={city} onChangeText={setCity} />

      <Pressable onPress={addCafe}>
        <Text>Add Cafe</Text>
      </Pressable>
    </View>
  );
};

export default NewCafePage;

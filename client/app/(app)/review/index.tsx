import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { Redirect } from "expo-router";

const NewReview = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [cafeId, setCafeId] = useState("");
  const [drink, setDrink] = useState("");

  const { axiosClient } = useAuth();

  const addReview = async () => {
    let rateNum;
    try {
      rateNum = rating as unknown as number;
    } catch (err) {
      return;
    }

    const response = await axiosClient.post("/review", {
      review,
      rating: 4,
      cafe_id: cafeId,
      drink,
    });

    if (response.status === 200) {
      console.log("Review added");
      return <Redirect href="/" />;
    }

    console.log("Review not added");
  };

  return (
    <View>
      <TextInput
        placeholder="Rating"
        onChangeText={(text) => setRating(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Review"
        multiline
        numberOfLines={3}
        onChangeText={(text) => setReview(text)}
      />
      <TextInput
        placeholder="Cafe ID"
        onChangeText={(text) => setCafeId(text)}
      />
      <TextInput placeholder="Drink" onChangeText={(text) => setDrink(text)} />
      <Pressable onPress={addReview}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
};

export default NewReview;

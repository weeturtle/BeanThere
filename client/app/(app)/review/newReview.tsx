import React, { useState } from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { Redirect } from "expo-router";
import { useMutation } from "@apollo/client";
import { ADDREVIEW } from "@/constants/mutations/review";

interface ReviewResponse {
  review: {
    id: string;
  };
}

interface ReviewRequest {
  review: string;
  rating: string;
  cafe_id: string;
  drink: string;
  time: string;
}

const NewReview = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [cafeId, setCafeId] = useState("");
  const [drink, setDrink] = useState("");

  const [addReview, { error, loading }] = useMutation<
    ReviewResponse,
    ReviewRequest
  >(ADDREVIEW, {
    onCompleted: (data) => {
      console.log(data);
      Redirect({ href: "/" });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const postReview = () => {
    addReview({
      variables: {
        review,
        rating,
        cafe_id: cafeId,
        drink,
        time: new Date().toISOString(),
      },
    });
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
      <Pressable onPress={postReview}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
};

export default NewReview;

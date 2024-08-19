import { ReviewRequest } from "@/app/(app)/review";
import React, { useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";

interface NewReviewProps {
  postReview: (input: ReviewRequest) => void;
}

const NewReview = ({ postReview }: NewReviewProps) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [cafe_id, setCafeId] = useState("");
  const [drink, setDrink] = useState("");

  const submit = () => {
    postReview({
      review,
      rating: parseInt(rating),
      cafe_id,
      drink,
      time: new Date().toISOString(),
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
      <Pressable onPress={submit}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
};

export default NewReview;

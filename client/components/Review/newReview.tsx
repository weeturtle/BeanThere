import React, { useState, forwardRef, useImperativeHandle } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import SearchCafePrompt from "../cafes/searchCafe";
import { useMutation } from "@apollo/client";
import { ADDREVIEW } from "@/constants/mutations/review";
import { Redirect, router } from "expo-router";

interface ReviewResponse {
  add_review: {
    id: string;
  };
}

export interface ReviewRequest {
  review: string;
  rating: number;
  cafe_id: string;
  drink: string;
  time: string;
}

interface Cafe {
  id: string;
  name: string;
}

const NewReview = forwardRef((_, ref) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [cafe, setCafe] = useState<Cafe | null>();
  const [drink, setDrink] = useState("");

  const [addReview, { loading }] = useMutation<ReviewResponse, ReviewRequest>(
    ADDREVIEW,
    {
      onCompleted: (data) => {
        console.log(data);
        router.replace("/");
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  const submit = () => {
    if (!cafe) {
      return;
    }

    addReview({
      variables: {
        review,
        rating: parseInt(rating),
        cafe_id: cafe.id,
        drink,
        time: new Date().toISOString(),
      },
    });
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  if (loading) {
    return <Text>Loading...</Text>;
  }

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
      {cafe ? (
        <View>
          <Text>{cafe.name}</Text>
          <Pressable onPress={() => setCafe(null)}>
            <Text>X</Text>
          </Pressable>
        </View>
      ) : (
        <SearchCafePrompt setCafe={setCafe} />
      )}
      <TextInput placeholder="Drink" onChangeText={(text) => setDrink(text)} />

      <Pressable onPress={submit}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
});

export default NewReview;

import React, { useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import SearchCafePrompt from "../cafes/searchCafe";
import { useMutation } from "@apollo/client";
import { ADDREVIEW } from "@/constants/mutations/review";
import { Redirect } from "expo-router";

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

const NewReview = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [cafe, setCafe] = useState<Cafe | null>();
  const [drink, setDrink] = useState("");

  const [addReview, { loading }] = useMutation<ReviewResponse, ReviewRequest>(
    ADDREVIEW,
    {
      onCompleted: (data) => {
        console.log(data);
        Redirect({ href: "/" });
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

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
};

export default NewReview;

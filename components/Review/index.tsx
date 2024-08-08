import React from "react";
import { View, Text } from "react-native";

interface IReviewProps {
  user_id: string;
  review: string;
  rating: number;
}

const Review = (props: IReviewProps) => {
  return (
    <View>
      <Text>Review</Text>
      <Text>{props.user_id}</Text>
      <Text>{props.rating}</Text>
      <Text>{props.review}</Text>
    </View>
  );
};

export default Review;

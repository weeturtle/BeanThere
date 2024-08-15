import { DASHBOARD_REVIEWS } from "@/constants/queries/reviews";
import { useSuspenseQuery } from "@apollo/client";
import React from "react";
import { Text, View } from "react-native";
import Review from ".";

export interface IReview {
  id: string;
  time: unknown;
  User: {
    name: string;
  };
  drink: string;
  rating: number;
  review: string;
  Cafe: {
    id: string;
    name: string;
    address: string;
  };
}

interface ReviewProps {
  reviews: IReview[];
}

const Reviews = () => {
  const { data, error } = useSuspenseQuery<ReviewProps>(DASHBOARD_REVIEWS);

  if (error) {
    return <Text>Error</Text>;
  }

  return (
    <View>
      {data.reviews.map((review) => (
        <Review key={review.id} {...review} />
      ))}
    </View>
  );
};

export default Reviews;

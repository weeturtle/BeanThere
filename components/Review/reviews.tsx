import React from "react";
import { Text, View } from "react-native";

export interface IReviews {
  id: string;
  User: {
    name: string;
  };
  drink: string;
  rating: number;
  review: string;
  Cafe: {
    name: string;
    address: string;
  };
}

interface ReviewProps {
  reviews: IReviews[];
}

const Reviews = ({ reviews }: ReviewProps) => {
  return (
    <View>
      {reviews.map((review) => (
        <View key={review.id}>
          <View>
            <View>
              <View>
                <Text>{review.User.name}</Text>
                <Text>{review.Cafe.name}</Text>
              </View>
              <Text>{review.rating}</Text>
            </View>
            <Text>{review.review}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Reviews;

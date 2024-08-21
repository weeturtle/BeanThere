import React, { FC } from "react";
import { IReview } from ".";
import { FlatList } from "react-native";

interface ReviewListProps {
  reviews: IReview[];
  ReviewItem: FC<{ review: IReview }>;
}

export const ReviewList = ({ reviews, ReviewItem }: ReviewListProps) => {
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

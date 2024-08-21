import React from "react";
import { useSuspenseQuery } from "@apollo/client";
import { View } from "react-native";
import { CAFEREVIEWS } from "@/constants/queries/reviews";
import Review, { IReview } from "..";
import { ReviewList } from "../reviewList";

interface CafeReviewsProps {
  cafe_id: string;
}

interface CafeReviewsResponse {
  cafe: {
    Reviews: IReview[];
  };
}

interface CafeReviewsRequest {
  id: string;
}

const CafeReviews = ({ cafe_id }: CafeReviewsProps) => {
  const { data, error } = useSuspenseQuery<
    CafeReviewsResponse,
    CafeReviewsRequest
  >(CAFEREVIEWS, {
    variables: { id: cafe_id },
  });

  if (error || !data) {
    return <View>Error</View>;
  }

  return <ReviewList reviews={data.cafe.Reviews} ReviewItem={Review} />;
};

export default CafeReviews;

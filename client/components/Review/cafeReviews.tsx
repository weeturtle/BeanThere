import React from "react";
import { useSuspenseQuery } from "@apollo/client";
import { View } from "react-native";
import { CAFEREVIEWS } from "@/constants/queries/reviews";
import { IReview, ReviewList } from "./reviews";

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

  return <ReviewList reviews={data.cafe.Reviews} />;
};

export default CafeReviews;

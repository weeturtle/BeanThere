import React, { useState } from "react";
import { Text } from "react-native";
import { Redirect } from "expo-router";
import { useMutation } from "@apollo/client";
import { ADDREVIEW } from "@/constants/mutations/review";
import NewReview from "@/components/Review/newReview";

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

const NewReviewPage = () => {
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

  const postReview = (input: ReviewRequest) => {
    addReview({ variables: input });
  };

  return <NewReview postReview={postReview} />;
};

export default NewReviewPage;

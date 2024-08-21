import React from "react";
import { useSuspenseQuery } from "@apollo/client";
import { Text } from "react-native";
import { PERSONALREVIEWS } from "@/constants/queries/reviews";
import Review, { IReview } from "..";
import { ReviewList } from "../reviewList";

interface PersonalPostsPropsResponse {
  user: {
    Reviews: IReview[];
  };
}

const PersonalPosts = () => {
  const { data, error } =
    useSuspenseQuery<PersonalPostsPropsResponse>(PERSONALREVIEWS);

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return <ReviewList reviews={data.user.Reviews} ReviewItem={Review} />;
};

export default PersonalPosts;

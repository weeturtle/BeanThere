import React from "react";
import { View } from "react-native";
import { IReview, ReviewList } from "./reviews";
import { useSuspenseQuery } from "@apollo/client";
import { FETCHUSERREVIEWS } from "@/constants/queries/user";

interface UserReviewListProps {
  user_id: string;
}

const UserReviewList = ({ user_id }: UserReviewListProps) => {
  const { data, error } = useSuspenseQuery<{ user: { Reviews: IReview[] } }>(
    FETCHUSERREVIEWS,
    {
      variables: {
        id: user_id,
      },
    },
  );

  return <ReviewList reviews={data.user.Reviews} />;
};

export default UserReviewList;

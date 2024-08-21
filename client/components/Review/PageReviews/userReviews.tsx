import React from "react";
import { useSuspenseQuery } from "@apollo/client";
import { FETCHUSERREVIEWS } from "@/constants/queries/user";
import Review, { IReview } from "..";
import { ReviewList } from "../reviewList";

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

  return <ReviewList reviews={data.user.Reviews} ReviewItem={Review} />;
};

export default UserReviewList;

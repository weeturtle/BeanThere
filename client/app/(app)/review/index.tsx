import React from "react";
import NewReview from "@/components/Review/newReview";
import { Stack } from "expo-router";
import NewReviewHeader from "@/components/headers/newReviewHeader";

const NewReviewPage = () => {
  return (
    <>
      <Stack.Screen
        options={{
          header: () => <NewReviewHeader />,
        }}
      />
      <NewReview />
    </>
  );
};

export default NewReviewPage;

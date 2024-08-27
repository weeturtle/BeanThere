import React, { useRef } from "react";
import NewReview from "@/components/Review/newReview";
import { Stack } from "expo-router";
import NewReviewHeader from "@/components/headers/newReviewHeader";

interface NewReviewRef {
  submit: () => void;
}

const NewReviewPage = () => {
  const newReviewRef = useRef<NewReviewRef>();

  const submitReview = async () => {
    const submitAction = newReviewRef?.current;
    if (submitAction) {
      submitAction.submit();
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <NewReviewHeader submit={submitReview} />,
        }}
      />
      <NewReview ref={newReviewRef} />
    </>
  );
};

export default NewReviewPage;

import PersonalPosts from "@/components/Review/PageReviews/personalReviews";
import React from "react";
import { Suspense } from "react";

const Posts = () => {
  return (
    <Suspense>
      <PersonalPosts />
    </Suspense>
  );
};

export default Posts;

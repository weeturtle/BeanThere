// import Review from "@/components/Review";
// import { useAuth } from "@/hooks/useAuth";
import React, { Suspense, useState } from "react";
import { Text, View } from "react-native";
import { Link } from "expo-router";
import Reviews, { IReviews } from "@/components/Review/reviews";
import { DASHBOARD_REVIEWS } from "@/constants/queries/reviews";
import { useQuery, useSuspenseQuery } from "@apollo/client";

// interface IReviewProps {
//   name: string;
//   review: string;
//   rating: number;
//   Cafe: {
//     name: string;
//   };
// }

const App = () => {
  const {
    data: { reviews },
    error,
  } = useSuspenseQuery<{ reviews: IReviews[] }>(DASHBOARD_REVIEWS);

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View>
      <Link href="/review">
        <Text>Add Reviews</Text>
      </Link>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Reviews reviews={reviews} />
      </Suspense>
    </View>
  );
};

// const styles = StyleSheet.create({
//   reviewsContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 10,
//   },
// });

export default App;

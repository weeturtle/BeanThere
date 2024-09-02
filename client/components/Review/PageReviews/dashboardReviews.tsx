import React from "react";
import { DASHBOARD_REVIEWS } from "@/constants/queries/reviews";
import { useSuspenseQuery } from "@apollo/client";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import Review, { IReview } from "..";
import { ReviewList } from "../reviewList";

interface ReviewProps {
  reviews: IReview[];
}

const Reviews = () => {
  console.log("Fetching reviews");
  // Error policy means error is caught and doesn't crash the page
  const { data, error } = useSuspenseQuery<ReviewProps>(DASHBOARD_REVIEWS, {
    errorPolicy: "all",
  });

  if (error) {
    return <Text>Error</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ReviewList reviews={data?.reviews || []} ReviewItem={Review} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Reviews;

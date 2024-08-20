import { DASHBOARD_REVIEWS } from "@/constants/queries/reviews";
import { useSuspenseQuery } from "@apollo/client";
import React from "react";
import { StyleSheet, FlatList, SafeAreaView, Text, View } from "react-native";
import Review from ".";

export interface IReview {
  id: string;
  time: unknown;
  User: {
    id: string;
    name: string;
  };
  drink: string;
  rating: number;
  review: string;
  Cafe: {
    id: string;
    name: string;
    address: string;
    last_visit: unknown;
  };
}

interface ReviewProps {
  reviews: IReview[];
}

const Reviews = () => {
  const { data, error } = useSuspenseQuery<ReviewProps>(DASHBOARD_REVIEWS);

  if (error) {
    return <Text>Error</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ReviewList reviews={data.reviews} />
    </SafeAreaView>
  );
};

export const ReviewList = ({ reviews }: { reviews: IReview[] }) => {
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <Review
          drink={item.drink}
          rating={item.rating}
          review={item.review}
          Cafe={item.Cafe}
          User={item.User}
          time={item.time}
          id={item.id}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Reviews;

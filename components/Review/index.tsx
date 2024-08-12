import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface IReviewProps {
  name: string;
  review: string;
  rating: number;
  cafe: string;
}

const Review = ({ name, review, rating, cafe }: IReviewProps) => {
  return (
    <View style={styles.container}>
      <Text>Review</Text>
      <Text>{name}</Text>
      <Text>{rating}</Text>
      <Text>{review}</Text>
      <Text>{cafe}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default Review;

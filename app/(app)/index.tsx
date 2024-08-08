import Review from "@/components/Review";
import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

interface IReviewProps {
  name: string;
  review: string;
  rating: number;
  Cafe: {
    name: string;
  };
}

const App = () => {
  const [reviews, setReviews] = useState<IReviewProps[]>([]);
  const { axiosClient } = useAuth();

  const fetchReviews = async () => {
    // Fetch reviews from the server
    const response = await axiosClient.get<IReviewProps[]>("/review/dashboard");

    if (response.status !== 200) {
      console.error("Failed to fetch reviews");
      return;
    }

    setReviews(response.data);

    console.log(response.data);
  };

  return (
    <View>
      <Link href="/review">
        <Text>Add Reviews</Text>
      </Link>
      <Pressable onPress={fetchReviews}>
        <Text>Fetch reviews</Text>
      </Pressable>
      <View style={styles.reviewsContainer}>
        {
          // Add some fake reviews for now
          reviews.map((review, i) => (
            <Review
              key={i}
              name={review.name}
              rating={review.rating}
              review={review.review}
              cafe={review.Cafe.name}
            />
          ))
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});

export default App;

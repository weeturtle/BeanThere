import Review from "@/components/Review";
import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";

interface IReviewProps {
  user_id: string;
  review: string;
  rating: number;
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
      <View>
        {
          // Add some fake reviews for now
          reviews.map((review, i) => (
            <Review
              key={i}
              user_id={review.user_id}
              rating={review.rating}
              review={review.review}
            />
          ))
        }
      </View>
    </View>
  );
};

export default App;

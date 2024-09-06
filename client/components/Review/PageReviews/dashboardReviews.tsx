import React, { useEffect } from "react";
import { DASHBOARD_REVIEWS } from "@/constants/queries/reviews";
import { useLazyQuery, useQuery, useSuspenseQuery } from "@apollo/client";
import { StyleSheet, SafeAreaView, Text, Pressable } from "react-native";
import Review, { IReview } from "..";
import { ReviewList } from "../reviewList";

interface ReviewProps {
  reviews: IReview[];
}

const Reviews = () => {
  // Error policy means error is caught and doesn't crash the page
  const [load, { data, error, fetchMore, refetch, loading }] =
    useLazyQuery<ReviewProps>(DASHBOARD_REVIEWS, {
      errorPolicy: "all",
    });

  useEffect(() => {
    console.log("Fetching initial reviews");
    load();
  }, []);

  const handleFetchMore = () => {
    console.log("Fetching more reviews");
    fetchMore({
      variables: {
        offset: data?.reviews.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          reviews: [...prev!.reviews, ...fetchMoreResult.reviews],
        };
      },
    });
  };

  const refreshReviews = () => {
    console.log("Refreshing reviews");
    refetch();
  };

  if (error) {
    return <Text>Error</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ReviewList
        reviews={data?.reviews || []}
        ReviewItem={Review}
        loadMore={handleFetchMore}
        loading={loading}
        refresh={refreshReviews}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Reviews;

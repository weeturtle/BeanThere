import React, { FC } from "react";
import { IReview } from ".";
import { FlatList } from "react-native";

interface ReviewListProps {
  reviews: IReview[];
  ReviewItem: FC<{ review: IReview }>;
  loadMore?: () => void;
  refresh?: () => void;
  loading?: boolean;
}

export const ReviewList = ({
  reviews,
  ReviewItem,
  loadMore,
  loading,
  refresh,
}: ReviewListProps) => {
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      onEndReached={loadMore}
      refreshing={loading}
      onRefresh={refresh}
    />
  );
};

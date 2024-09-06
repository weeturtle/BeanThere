import React, { FC, ReactElement, ReactNode } from "react";
import { IReview } from ".";
import { FlatList } from "react-native";

interface ReviewListProps {
  reviews: IReview[];
  ReviewItem: FC<{ review: IReview }>;
  loadMore?: ReactElement;
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
      ListFooterComponent={loadMore}
      refreshing={loading}
      onRefresh={refresh}
    />
  );
};

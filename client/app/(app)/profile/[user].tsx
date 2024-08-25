import React, { Suspense } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSuspenseQuery } from "@apollo/client";
import { FETCHUSER } from "@/constants/queries/user";
import { View, Text, StyleSheet } from "react-native";
import UserReviewList from "@/components/Review/PageReviews/userReviews";

interface UserResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const UserPage = () => {
  const { user } = useLocalSearchParams<{ user: string }>();

  const { data, error } = useSuspenseQuery<UserResponse>(FETCHUSER, {
    variables: {
      id: user,
    },
  });

  return (
    <View style={styles.ReviewList}>
      <Text>{data.user.name}</Text>
      <Suspense fallback={<Text>Loading...</Text>}>
        <UserReviewList user_id={user} />
      </Suspense>
    </View>
  );
};

const styles = StyleSheet.create({
  ReviewList: {
    flex: 1,
  },
});

export default UserPage;

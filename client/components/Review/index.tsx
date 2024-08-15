import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { IReview } from "./reviews";
import formatTime from "./formatTime";
import { Link } from "expo-router";

const Review = (review: IReview) => {
  const date = new Date((review.time as number) * 1000);
  const formattedTime = formatTime(date);

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text>{review.User.name}</Text>
          <Text>{formattedTime}</Text>
        </View>
        <View>
          <Text>{review.rating}</Text>
          <Text>{review.drink}</Text>
          <Text>{review.review}</Text>
        </View>
      </View>
      <View style={styles.rightView}>
        <Image
          style={styles.image}
          source={{
            uri: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg",
          }}
        />
        <Link href={`/cafes/${review.Cafe.id}`}>
          <View style={styles.cafeInfo}>
            <Text>{review.Cafe.name}</Text>
            <Text>{review.Cafe.address}</Text>
          </View>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: "#000",
    borderWidth: 1,
    flex: 2,
    marginHorizontal: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  // Align the right view to the right
  // of the parent view
  rightView: {
    flexDirection: "column",
    alignItems: "flex-end",
  },

  cafeInfo: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  image: {
    width: 200,
    height: 200,
  },
});

export default Review;

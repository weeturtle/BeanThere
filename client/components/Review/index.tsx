import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { IReview } from "./reviews";
import formatTime from "./formatTime";
import { Link } from "expo-router";

const Review = (review: IReview) => {
  const date = new Date((review.time as number) * 1);
  const formattedTime = formatTime(date);
  const shortennedAddress = review.Cafe.address.split(",")[0];

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.leftView}>
          <View>
            <Link href={`/(app)/profile/${review.User.id}`}>
              {review.User.name}
            </Link>
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
              <Text>{shortennedAddress}</Text>
            </View>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    height: 240,
  },
  container: {
    width: "100%",
    borderColor: "#000",
    borderWidth: 1,
    flex: 2,
    marginHorizontal: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  leftView: {
    maxWidth: "50%",
  },

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

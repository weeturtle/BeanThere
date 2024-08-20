import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { IReview } from "./reviews";
import formatTime, { formatLastVisit } from "./formatTime";
import { Link } from "expo-router";

const Review = (review: IReview) => {
  const reviewDate = new Date((review.time as number) * 1);
  const formattedTime = formatTime(reviewDate);
  const shortennedAddress = review.Cafe.address.split(",")[0];

  const lastVisit = review.Cafe.last_visit;
  const formattedLastVisit = lastVisit
    ? `Last visited ${formatLastVisit(new Date((lastVisit as number) * 1))}`
    : "Never visited";

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
              <Text>{formattedLastVisit}</Text>
            </View>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    padding: 10,
  },
  container: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
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
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  image: {
    width: 200,
    height: 200,
  },
});

export default Review;

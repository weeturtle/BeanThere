import React, { Suspense } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useSuspenseQuery } from "@apollo/client";
import { CAFE } from "@/constants/queries/cafes";
import CafeReviews from "@/components/Review/cafeReviews";

interface ICafe {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
}

interface CafeVars {
  id: string;
}

const CafePage = () => {
  const { cafe } = useLocalSearchParams();

  if (!cafe) {
    router.replace("/cafes");
  }

  const { data, error } = useSuspenseQuery<{ cafe: ICafe }, CafeVars>(CAFE, {
    variables: { id: cafe as string },
  });

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View>
      <ScrollView horizontal={true}>
        {Array.from({ length: 5 }).map((_, id) => {
          return <TempImage key={id} />;
        })}
      </ScrollView>
      <Text style={styles.title}>{data.cafe.name}</Text>
      <Text>{data.cafe.address}</Text>
      <Suspense fallback={<Text>Loading...</Text>}>
        <CafeReviews cafe_id={data.cafe.id} />
      </Suspense>
    </View>
  );
};

const TempImage = () => (
  <Image
    style={styles.image}
    source={{
      uri: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg",
    }}
  />
);

const styles = {
  image: {
    width: 160,
    height: 160,
  },

  title: {
    fontSize: 24,
    fontWeight: "800" as "800",
  },
};

export default CafePage;

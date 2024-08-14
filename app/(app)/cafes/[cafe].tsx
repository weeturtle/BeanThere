import React from "react";
import { View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useSuspenseQuery } from "@apollo/client";
import { CAFE } from "@/constants/queries/cafes";

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

  return (
    <View>
      <Text>Cafe: {data.cafe.name}</Text>
    </View>
  );
};

export default CafePage;

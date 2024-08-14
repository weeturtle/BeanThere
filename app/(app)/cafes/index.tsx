import React, { Suspense } from "react";
import { Link } from "expo-router";
import { View, Text } from "react-native";
import Cafes from "@/components/cafes";

const CafePage = () => {
  return (
    <View>
      <Text> Cafe Page </Text>
      <Link href="/profile/starredCafes">
        <Text>Starred Cafes</Text>
      </Link>
      {/*
      <Pressable onPress={fetchCafes}>
        <Text>Fetch Cafes</Text>
      </Pressable>

      {cafes.map((cafe) => (
        <View key={cafe.name}>
          <Text>{cafe.name}</Text>
        </View>
      ))}
        */}
      <Suspense fallback={<Text>Loading...</Text>}>
        <Cafes />
      </Suspense>
    </View>
  );
};

export default CafePage;

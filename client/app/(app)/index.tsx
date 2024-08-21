import React, { Suspense } from "react";
import { Text, View } from "react-native";
import { Link } from "expo-router";
import Reviews from "@/components/Review/PageReviews/dashboardReviews";

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Link href="/review">
        <Text>Add Reviews</Text>
      </Link>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Reviews />
      </Suspense>
    </View>
  );
};

export default App;

import React, { Suspense } from "react";
import { Text, View } from "react-native";
import { Link, Stack } from "expo-router";
import Reviews from "@/components/Review/PageReviews/dashboardReviews";
import DashboardHeader from "@/components/headers/dashboardHeader";

const App = () => {
  return (
    <>
      <Stack.Screen
        options={{
          header: () => <DashboardHeader />,
        }}
      />
      <View style={{ flex: 1 }}>
        <Suspense fallback={<Text>Loading...</Text>}>
          <Reviews />
        </Suspense>
      </View>
    </>
  );
};

export default App;

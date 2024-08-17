import React, { Suspense } from "react";
import { View, Text, StyleSheet } from "react-native";
import Cafes from "@/components/cafes";
import { Link } from "expo-router";

const CafePage = () => {
  return (
    <View style={styles.container}>
      <Link href="/(app)/cafes/newCafe">
        <Text>New Cafe</Text>
      </Link>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Cafes />
      </Suspense>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default CafePage;

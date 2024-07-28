import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Pressable, Text } from "react-native";

const App = () => {
  const { signout } = useAuth();

  return (
    <Pressable onPress={signout}>
      <Text>Sign out</Text>
    </Pressable>
  );
};

export default App;

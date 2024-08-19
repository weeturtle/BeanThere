import React, { Suspense } from "react";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import CafeList from "./cafesList";

interface Cafe {
  id: string;
  name: string;
}

interface SearchCafePromptProps {
  setCafe: (cafe: Cafe | null) => void;
}

const SearchCafePrompt = ({ setCafe }: SearchCafePromptProps) => {
  const [cafePrompt, setCafePrompt] = useState("");

  return (
    <View>
      <TextInput
        value={cafePrompt}
        onChangeText={(text) => setCafePrompt(text)}
        placeholder="Search for a cafe"
      />

      <Suspense fallback={<Text>Loading...</Text>}>
        <CafeList setCafe={setCafe} prompt={cafePrompt} />
      </Suspense>
    </View>
  );
};

export default SearchCafePrompt;

import { SEARCHCAFE } from "@/constants/queries/cafes";
import { useSuspenseQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { View, Pressable, Text } from "react-native";

interface Cafe {
  id: string;
  name: string;
}

interface CafeListProps {
  prompt: string;
  setCafe: (id: Cafe | null) => void;
}

const CafeList = ({ prompt, setCafe }: CafeListProps) => {
  const { data, refetch } = useSuspenseQuery<{ cafes: Cafe[] }>(SEARCHCAFE, {
    skip: !prompt,
  });

  const cafes = data?.cafes || [];

  useEffect(() => {
    if (!prompt) {
      setCafe(null);
    }

    refetch({
      prompt,
    });
  }, [prompt]);

  return (
    <View>
      {cafes.map((cafe) => (
        <Pressable key={cafe.id} onPress={() => setCafe(cafe)}>
          <Text>{cafe.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default CafeList;

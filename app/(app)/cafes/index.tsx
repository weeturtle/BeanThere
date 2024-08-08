import React, { useState } from "react";
import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { useAuth } from "@/hooks/useAuth";

interface ICafe {
  name: string;
  address: string;
  description: string;
  city: string;
}

const CafePage = () => {
  const [cafes, setCafes] = useState<ICafe[]>([]);

  const { axiosClient } = useAuth();

  const fetchCafes = async () => {
    try {
      const response = await axiosClient.get<ICafe[]>("/cafe");
      setCafes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text> Cafe Page </Text>
      <Link href="/profile/starredCafes">
        <Text>Starred Cafes</Text>
      </Link>
      <Pressable onPress={fetchCafes}>
        <Text>Fetch Cafes</Text>
      </Pressable>

      {cafes.map((cafe) => (
        <View key={cafe.name}>
          <Text>{cafe.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default CafePage;

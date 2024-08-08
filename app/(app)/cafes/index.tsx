import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import axios from "axios";
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

import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pressable, View, Text } from "react-native";

interface ICafe {
  cafe_id: string;
  name: string;
}

const StarredCafesPage = () => {
  const { axiosClient } = useAuth();
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    useFetchStarredCafes();
  }, []);

  const useFetchStarredCafes = async () => {
    try {
      const response = await axios.get("/user/starred_cafes");
      setCafes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const unstarCafe = async (cafe_id: string) => {
    console.log({
      cafe_id,
      star: false,
    });
    try {
      const response = await axiosClient.post("/user/star", {
        data: {
          cafe_id,
          star: false,
        },
      });

      useFetchStarredCafes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      {cafes &&
        cafes.map((cafe: ICafe) => (
          <View key={cafe.cafe_id}>
            <Text>{cafe.name}</Text>
            <Pressable>
              <Text onPress={() => unstarCafe(cafe.cafe_id)}>Unstar</Text>
            </Pressable>
          </View>
        ))}
      <Pressable onPress={useFetchStarredCafes}>
        <Text>Fetch Starred Cafes</Text>
      </Pressable>
    </View>
  );
};

export default StarredCafesPage;

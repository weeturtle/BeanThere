import React from "react";
import { ALLCAFES } from "@/constants/queries/cafes";
import { useSuspenseQuery } from "@apollo/client";
import { View, Text } from "react-native";
import { Link } from "expo-router";

interface ICafe {
  id: string;
  name: string;
  address: string;
  city: string;
}

const Cafes = () => {
  const { data, error } = useSuspenseQuery<{ cafes: ICafe[] }>(ALLCAFES);

  if (error) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <View>
      {data.cafes.map((cafe) => (
        <Cafe key={cafe.id} {...cafe} />
      ))}
    </View>
  );
};

const Cafe = ({ name, city, address, id }: ICafe) => {
  return (
    <View>
      <Link href={`/cafes/${id}`}>
        <Text>{name}</Text>
      </Link>
      <Text>{city}</Text>
      <Text>{address}</Text>
    </View>
  );
};

export default Cafes;

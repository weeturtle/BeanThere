import React from "react";
import { ALLCAFES } from "@/constants/queries/cafes";
import { useSuspenseQuery } from "@apollo/client";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
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
    <FlatList
      data={data?.cafes}
      keyExtractor={(item) => item.id}
      renderItem={({ item: cafe }) => <Cafe {...cafe} />}
    />
  );
};

const Cafe = ({ name, city, address, id }: ICafe) => {
  return (
    <Link href={`/cafes/${id}`} style={styles.linkContainer}>
      <View style={styles.cafeContainer}>
        <Image
          source={{
            uri: "https://beanthere.at/2017/03/06/Review-Colonna-smalls-Bath/ColonnaAndSmalls-Interior2.jpg",
          }}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.city}>{city}</Text>
          </View>
          <Text>{address}</Text>
        </View>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    width: "80%",
    alignSelf: "center",
  },
  cafeContainer: {
    width: "100%",
    flexDirection: "row",
    columnGap: 14,
    flex: 2,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },

  infoContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },

  city: {
    fontSize: 14,
    fontWeight: "600",
  },

  address: {
    fontSize: 14,
    fontWeight: "400",
    flexWrap: "wrap",
    flex: 1,
  },

  image: {
    height: 100,
    width: 100,
  },
});

export default Cafes;

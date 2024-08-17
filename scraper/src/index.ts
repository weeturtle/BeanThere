import {
  ApolloClient,
  gql,
  HttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import fetch from "cross-fetch";
import cafes from "../data/cafeData.json";

interface IOpeningTimes {
  day: string;
  time: string;
}

interface INewCafe {
  name: string;
  description: string;
  address: string;
  city: string;
  opening_times: IOpeningTimes[];
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000",
    fetch,
  }),
  cache: new InMemoryCache(),
});

const addCafe = async (cafe: INewCafe) => {
  const ADD_CAFE = gql`
    mutation AddCafe($input: NewCafeRequest!) {
      add_cafe(input: $input) {
        id
        name
        description
        address
        city
      }
    }
  `;

  const response = await client.mutate({
    mutation: ADD_CAFE,
    variables: {
      input: cafe,
    },
  });

  console.log(response);
};

cafes.forEach((cafe) => {
  try {
    const typedCafe = {
      name: cafe.title,
      description: cafe.description || "",
      address: cafe.address,
      city: "Bath",
      opening_times: cafe.workingHours.days.map(
        ({ day, time }: { day: string; time: string }) => {
          return { day, time };
        },
      ),
    };

    addCafe(typedCafe);
  } catch (e) {
    console.error(e);
  }
});

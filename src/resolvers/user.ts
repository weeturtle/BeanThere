import { User } from "../graph/types";

const userResolver = {
  Friends: async (user: User) => {
    console.log("Fetching friends");
    return [{ id: 1, email: "ali@gmail.com", name: "Ali" }];
  },
  Starred_Cafes: (user: User) => {
    return [
      {
        id: 1,
        name: "Cafe 1",
        description: "Cafe 1",
        address: "1234 Cafe St",
        city: "Cafe City",
      },
    ];
  },
  Reviews: async (user: User) => {
    return [
      {
        id: 1,
        rating: 5,
        review: "Great cafe",
        drink: "Latte",
        time: "2021-01-01",
      },
    ];
  },
};

export default userResolver;

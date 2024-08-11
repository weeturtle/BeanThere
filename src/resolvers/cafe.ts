import { Cafe } from "../graph/types";

const cafeResolver = {
  Reviews: async (cafe: Cafe) => {
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

export default cafeResolver;

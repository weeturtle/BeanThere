import { Review } from "../graph/types";

const reviewResolver = {
  User: async (review: Review) => {
    return { id: 1, email: "max@gmail.com", name: "Max" };
  },
  Cafe: async (review: Review) => {
    return {
      id: 1,
      name: "Cafe 1",
      description: "Cafe 1",
      address: "1234 Cafe St",
      city: "Cafe City",
    };
  },
  Photos: async (review: Review) => {
    return [{ id: 1, key: "photo1.jpg" }];
  },
};

export default reviewResolver;

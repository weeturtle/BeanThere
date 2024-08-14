import prisma from "../database";
import { Review, User } from "../graph/types";

const reviewResolver = {
  User: async (review: Review): Promise<User | null> => {
    return await prisma.users.findUnique({
      where: {
        id: review.user_id,
      },
    });
  },
  Cafe: async (review: Review) => {
    return await prisma.cafes.findUnique({
      where: {
        id: review.cafe_id,
      },
    });
  },
  Photos: async (review: Review) => {
    return [{ id: 1, key: "photo1.jpg" }];
  },
};

export default reviewResolver;

import { Cafe, Review, User } from "../graph/types";
import prisma from "../database";

const userResolver = {
  Friends: async ({ id }: User): Promise<User[] | null> => {
    return prisma.users.findMany({
      where: {
        Friends: {
          some: {
            friend_user_id: id,
          },
        },
      },
    });
  },
  Starred_Cafes: ({ id }: User): Promise<Cafe[] | null> => {
    return prisma.cafes.findMany({
      where: {
        Starred_Cafes: {
          some: {
            user_id: id,
          },
        },
      },
    });
  },
  Reviews: async ({ id }: User): Promise<Review[] | null> => {
    return prisma.reviews.findMany({
      where: {
        user_id: id,
      },
    });
  },
};

export default userResolver;

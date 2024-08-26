import { Cafe, Review, User } from "../graph/types";
import prisma from "../database";

const userResolver = {
  Friends: async ({ id }: User): Promise<User[] | null> => {
    const friends = await prisma.friends.findMany({
      where: {
        user_id: id,
      },
      select: {
        Friend_User: true,
      },
    });

    return friends.map((friend) => friend.Friend_User);
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
      orderBy: {
        time: "desc",
      },
    });
  },
};

export default userResolver;

import prisma from "../database";
import { Cafe } from "../graph/types";

const cafeResolver = {
  Reviews: async (cafe: Cafe) => {
    return prisma.reviews.findMany({
      where: {
        cafe_id: cafe.id,
      },
    });
  },
};

export default cafeResolver;

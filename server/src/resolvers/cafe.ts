import { GraphQLError } from "graphql";
import prisma from "../database";
import { Cafe } from "../graph/types";
import authenticate from "../util/authenticate";

const cafeResolver = {
  Reviews: async (cafe: Cafe) => {
    return prisma.reviews.findMany({
      where: {
        cafe_id: cafe.id,
      },
      orderBy: {
        time: "desc",
      },
    });
  },
  OpeningTimes: async (cafe: Cafe) => {
    return prisma.opening_Times.findMany({
      where: {
        cafe_id: cafe.id,
      },
    });
  },
  last_visit: async (cafe: Cafe, _: any, context: unknown) => {
    const authResponse = await authenticate(context);

    if (!authResponse) {
      throw new GraphQLError("Unauthorized");
    }

    const review = await prisma.reviews.findFirst({
      where: {
        cafe_id: cafe.id,
        user_id: authResponse.user_id,
      },
      orderBy: {
        time: "desc",
      },
    });

    return review?.time;
  },
};

export default cafeResolver;

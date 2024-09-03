import { GraphQLError } from "graphql";
import { AuthContext } from "../../../util/authenticate";
import prisma from "../../../database";

interface INewReview {
  rating: number;
  review: string;
  cafe_id: string;
  drink: string;
  time: string;
}

const reviewResolvers = {
  add_review: async (
    _: any,
    { input: { rating, review, cafe_id, drink, time } }: { input: INewReview },
    context: unknown,
  ) => {
    const { user_id } = context as AuthContext;

    if (!user_id) {
      throw new GraphQLError("Unauthorized");
    }

    return prisma.reviews.create({
      data: {
        rating,
        review,
        cafe_id,
        user_id,
        drink,
        time: new Date(time),
      },
    });
  },
  remove_review: async (_: any, { id }: { id: string }) => {
    try {
      await prisma.reviews.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};

export default reviewResolvers;

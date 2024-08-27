import { GraphQLError } from "graphql";
import authenticate from "../../../util/authenticate";
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
    const authResponse = await authenticate(context);

    if (!authResponse) {
      throw new GraphQLError("Unauthorized");
    }

    return prisma.reviews.create({
      data: {
        rating,
        review,
        cafe_id,
        user_id: authResponse.user_id,
        drink,
        time: new Date(time),
      },
    });
  },
};

export default reviewResolvers;

import { GraphQLError } from "graphql";
import prisma from "../../database";
import authenticate from "../../util/authenticate";
import { Cafe } from "../../graph/types";

interface INewReview {
  rating: number;
  review: string;
  cafe_id: string;
  drink: string;
  time: string;
}

interface INewCafe {
  name: string;
  description: string;
  address: string;
  city: string;
}

interface INewFriend {
  email: string;
}

const serverMutationResolvers = {
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
  add_cafe: async (
    _: any,
    { input: { name, address, city, description } }: { input: INewCafe },
  ): Promise<Cafe | null> => {
    return prisma.cafes.create({
      data: {
        name,
        address,
        city,
        description,
      },
    });
  },
  add_friend: async (
    _: any,
    { input: { email } }: { input: INewFriend },
    context: unknown,
  ) => {
    const authResponse = await authenticate(context);

    if (!authResponse) {
      throw new GraphQLError("Unauthorized");
    }

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new GraphQLError("User not found");
    }

    await prisma.friends.create({
      data: {
        user_id: authResponse.user_id,
        friend_user_id: user.id,
      },
    });

    return user;
  },
};

export default serverMutationResolvers;

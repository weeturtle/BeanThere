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

interface IOpeningTimes {
  day: string;
  time: string;
}

interface INewCafe {
  name: string;
  description: string;
  address: string;
  city: string;
  opening_times: IOpeningTimes[];
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
    {
      input: { name, address, city, description, opening_times },
    }: { input: INewCafe },
  ): Promise<Cafe | null> => {
    return prisma.cafes.create({
      data: {
        name,
        address,
        city,
        description,
        Opening_Times: {
          create: opening_times,
        },
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

  remove_cafe: async (_: any, { id }: { id: string }): Promise<boolean> => {
    try {
      await prisma.cafes.delete({
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

export default serverMutationResolvers;

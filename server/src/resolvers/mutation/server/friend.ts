import { GraphQLError } from "graphql";
import prisma from "../../../database";
import authenticate from "../../../util/authenticate";

interface INewFriend {
  email: string;
}

const friendResolvers = {
  add_friend: async (
    _: any,
    { input: { email } }: { input: INewFriend },
    context: unknown,
  ) => {
    console.log("Auth Request: Add Friend");
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

export default friendResolvers;

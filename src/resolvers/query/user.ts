import { User } from "../../graph/types";
import prisma from "../../database";
import { GraphQLError } from "graphql";
import authenticate from "../../util/authenticate";

export const userQueryByEmail = async (
  _: any,
  { email }: { email: string },
): Promise<User | null> => {
  return prisma.users.findUnique({ where: { email } });
};

interface UserQueryArgs {
  id?: string;
  email?: string;
}

export const userQuery = async (
  _: any,
  { id, email }: UserQueryArgs,
  context: unknown,
) => {
  console.log(context);
  if (id) {
    return prisma.users.findUnique({ where: { id } });
  } else if (email) {
    return prisma.users.findUnique({ where: { email } });
  }

  const authResponse = await authenticate(context);

  if (authResponse) {
    return prisma.users.findUnique({ where: { id: authResponse.user_id } });
  }

  console.log(authResponse);

  throw new GraphQLError("Invalid query");
};

export const userFriendsQuery = async (
  _: any,
  { prompt }: { prompt: string },
  context: unknown,
) => {
  const authResponse = await authenticate(context);
  if (!authResponse) {
    throw new GraphQLError("Unauthorized");
  }

  const { user_id } = authResponse;

  const friends = await prisma.friends.findMany({
    where: {
      user_id,
    },
    select: {
      friend_user_id: true,
    },
  });

  const users = await prisma.users.findMany({
    where: {
      AND: {
        NOT: {
          id: user_id,
        },
        OR: [
          { email: { contains: prompt, mode: "insensitive" } },
          { name: { contains: prompt, mode: "insensitive" } },
        ],
      },
    },
  });

  const formattedUsers = users
    .map((user) => {
      return {
        user,
        isFriend: friends.some((friend) => friend.friend_user_id === user.id),
      };
    })
    .sort((a, _) => {
      return a.isFriend ? -1 : 1;
    });

  return formattedUsers;
};

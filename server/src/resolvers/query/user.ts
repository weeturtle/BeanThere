import { User } from "../../graph/types";
import prisma from "../../database";
import { GraphQLError } from "graphql";
import { AuthContext } from "../../util/authenticate";

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
  const { user_id } = context as AuthContext;
  if (id) {
    return prisma.users.findUnique({ where: { id } });
  } else if (email) {
    return prisma.users.findUnique({ where: { email } });
  }

  if (user_id) {
    return prisma.users.findUnique({ where: { id: user_id } });
  }

  throw new GraphQLError("Invalid query");
};

export const userFriendsQuery = async (
  _: any,
  { prompt }: { prompt: string },
  context: unknown,
) => {
  const { user_id } = context as AuthContext;

  if (!user_id) {
    throw new GraphQLError("Unauthorized");
  }

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
        OR: [{ name: { contains: prompt, mode: "insensitive" } }],
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

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

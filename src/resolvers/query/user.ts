import { User } from "../../graph/types";
import prisma from "../../database";

export const userQueryByEmail = async (
  _: any,
  { email }: { email: string },
): Promise<User | null> => {
  return prisma.users.findUnique({ where: { email } });
};

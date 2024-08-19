import prisma from "../../database";
import { Cafe } from "../../graph/types";

interface CafeQueryArgs {
  city?: string;
  prompt?: string;
}

export const cafeQuery = (
  _: any,
  { id }: { id: string },
): Promise<Cafe | null> => {
  return prisma.cafes.findUnique({ where: { id } });
};

export const cafesQuery = (
  _: any,
  { city, prompt }: CafeQueryArgs,
): Promise<Cafe[] | null> => {
  if (prompt) {
    return prisma.cafes.findMany({
      take: 5,
      where: {
        name: { contains: prompt, mode: "insensitive" },
      },
    });
  }

  if (city) {
    return prisma.cafes.findMany({ where: { city } });
  }

  return prisma.cafes.findMany();
};

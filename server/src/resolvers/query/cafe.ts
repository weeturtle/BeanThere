import prisma from "../../database";
import { Cafe } from "../../graph/types";

interface CafeQueryArgs {
  city?: string;
}

export const cafeQueryById = (
  _: any,
  { id }: { id: string },
): Promise<Cafe | null> => {
  return prisma.cafes.findUnique({ where: { id } });
};

export const cafesQuery = (
  _: any,
  { city }: CafeQueryArgs,
): Promise<Cafe[] | null> => {
  if (city) {
    return prisma.cafes.findMany({ where: { city } });
  }

  return prisma.cafes.findMany();
};

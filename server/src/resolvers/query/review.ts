import prisma from "../../database";
import { Review } from "../../graph/types";

export const allReviewQuery = (): Promise<Review[] | null> => {
  return prisma.reviews.findMany();
};

export const reviewQueryById = (_: any, { id }: { id: string }) => {
  return prisma.reviews.findUnique({ where: { id } });
};

import prisma from "../../database";
import { Review } from "../../graph/types";
import { AuthContext } from "../../util/authenticate";

export const allReviewQuery = (): Promise<Review[] | null> => {
  return prisma.reviews.findMany({ orderBy: { time: "desc" }, take: 10 });
};

export const relevantReviewsQuery = async (
  _: any,
  _2: any,
  context: unknown,
) => {
  const { user_id } = context as AuthContext;

  if (!user_id) {
    return null;
  }

  // Fetch reviews from the user themselves or the users they follow
  const reviews = await prisma.reviews.findMany({
    where: {
      OR: [
        { user_id },
        {
          User: {
            FriendUserFriends: {
              some: {
                user_id,
              },
            },
          },
        },
      ],
    },
    take: 10,
    orderBy: {
      time: "desc",
    },
  });

  return reviews;
};

export const reviewQueryById = (_: any, { id }: { id: string }) => {
  return prisma.reviews.findUnique({ where: { id } });
};

import { Router } from "express";
import prisma from "../database";
import authenticate from "../util/authenticate";

interface IReviewParams {
  rating: number;
  review: string;
  user_id: string;
  cafe_id: string;
  drink: string;
  tagged_users?: string[];
  photos?: string[];
}

const reviewRouter = Router();

reviewRouter.use(authenticate);
reviewRouter.post("/", async (req, res) => {
  const review_info = req.body as IReviewParams;

  const response = await prisma.reviews.create({
    data: {
      rating: review_info.rating,
      review: review_info.review,
      drink: review_info.drink,
      Cafe: {
        connect: {
          id: review_info.cafe_id,
        },
      },
      User: {
        connect: {
          id: review_info.user_id,
        },
      },
    },
  });

  const tagged_users = review_info.tagged_users;
  if (tagged_users) {
    prisma.tagged_User_Reviews.createMany({
      data: tagged_users.map((user_id) => {
        return {
          review_id: response.id,
          user_id: user_id,
        };
      }),
    });
  }

  // Ignore photos for now

  return res.json(response).status(200);
});

reviewRouter.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  const reviews = await prisma.reviews.findMany({
    where: {
      user_id: user_id,
    },
  });

  return res.json(reviews).status(200);
});

export default reviewRouter;

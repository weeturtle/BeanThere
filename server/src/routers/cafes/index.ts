import { Router } from "express";
import prisma from "../../database";
import { findFriendStarredCafes } from "./frendCafes";

const cafeRouter = Router();

interface ICafeParams {
  name: string;
  description: string;
  address: string;
  city: string;
}

cafeRouter.post("/", async (req, res) => {
  const cafe_info = req.body as ICafeParams;

  const response = await prisma.cafes.create({
    data: {
      name: cafe_info.name,
      description: cafe_info.description,
      address: cafe_info.address,
      city: cafe_info.city,
    },
  });

  return res.json(response).status(200);
});

cafeRouter.get("/", async (req, res) => {
  const cafes = await prisma.cafes.findMany();

  return res.json(cafes).status(200);
});

cafeRouter.post("/friendstarred", async (req, res) => {
  // Fetch user_id from header and cafe_id from body
  const user_id = req.headers["user_id"] as string;
  const cafe_id = req.body["cafe_id"] as string;

  if (!cafe_id || !user_id) {
    return res.json({ message: "Missing information" }).status(400);
  }

  const friends = await findFriendStarredCafes(user_id, cafe_id);

  return res.json(friends).status(200);
});

cafeRouter.get("/:city", async (req, res) => {
  const { city } = req.params;

  const cafes = await prisma.cafes.findMany({
    where: {
      city: city,
    },
  });

  return res.json(cafes).status(200);
});

export default cafeRouter;

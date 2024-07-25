import { Router } from "express";
import prisma from "../database";

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

cafeRouter.get("/:city", async (req, res) => {
  const { city } = req.params;

  const cafes = await prisma.cafes.findMany({
    where: {
      city: city,
    },
  });

  return res.json(cafes).status(200);
});

// Let a user star a cafe, or unstar a cafe, requires user_id and cafe_id
cafeRouter.post("/star", async (req, res) => {
  const { user_id, cafe_id, star } = req.body;

  const user = await prisma.users.findFirst({
    where: {
      id: user_id,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const cafe = await prisma.cafes.findFirst({
    where: {
      id: cafe_id,
    },
  });

  if (!cafe) {
    return res.status(400).json({ message: "Cafe not found" });
  }

  if (star) {
    const response = await prisma.starred_Cafes.create({
      data: {
        user_id,
        cafe_id,
      },
    });

    return res.json({ message: "Cafe starred" }).status(200);
  } else {
    await prisma.starred_Cafes.deleteMany({
      where: {
        user_id,
        cafe_id,
      },
    });

    return res.status(200).json({ message: "Cafe unstarred" });
  }
});

export default cafeRouter;

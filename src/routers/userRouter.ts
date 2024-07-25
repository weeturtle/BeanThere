import { Router } from "express";
import prisma from "../database";

const userRouter = Router();

userRouter.post("/", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res
      .status(400)
      .json({ message: "First name, last name and email are required" });
  }

  const response = await prisma.users.create({
    data: {
      name,
      email,
    },
  });

  return res.json(response).status(200);
});

userRouter.get("/", async (req, res) => {
  const users = await prisma.users.findMany();

  return res.json(users).status(200);
});

userRouter.get("/:email", async (req, res) => {
  const { email } = req.params;

  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });

  return res.json(user).status(200);
});

// Allow to search by partial name
userRouter.get("/search/:name", async (req, res) => {
  const { name } = req.params;

  const users = await prisma.users.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });

  return res.json(users).status(200);
});

export default userRouter;

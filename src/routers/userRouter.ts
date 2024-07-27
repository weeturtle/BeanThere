import { Router } from "express";
import prisma from "../database";
import axios from "axios";
import { AUTH_URL } from "../util/envs";
import authenticate from "../util/authenticate";

const userRouter = Router();

userRouter.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing information" });
  }

  const auth_response = await axios.post(AUTH_URL + "/signup", {
    email,
    password,
  });

  if (auth_response.status !== 200 || !auth_response.data.userId) {
    return res.status(401).json({ message: "Failed to create account" });
  }

  try {
    await prisma.users.create({
      data: {
        id: auth_response.data.userId,
        name,
        email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create account" });
  }

  return res.json({ token: auth_response.data.token }).status(200);
});

userRouter.use(authenticate);

userRouter.get("/", async (req, res) => {
  console.log(`User ID: ${req.headers["user_id"]}`);
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

userRouter.delete("/", async (req, res) => {
  const userId = req.headers["user_id"] as string;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  console.log(`Deleting user with id: ${userId}`);

  await axios.delete(AUTH_URL + "/delete/" + userId);

  await prisma.users.delete({
    where: {
      id: userId as string,
    },
  });

  return res.status(200).json({ message: "User deleted" });
});

export default userRouter;

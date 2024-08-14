import { Router } from "express";
import prisma from "../../database";
import axios, { AxiosError } from "axios";
import { AUTH_URL } from "../../util/envs";
import authenticate from "../../util/authenticate";
import MatchTest from "../../util/matchTest";

const userRouter = Router();

userRouter.get("/test", async (_, res) => {
  const result = await MatchTest();

  return res.json({ result }).status(200);
});

userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing information" });
  }

  console.log("Error check start");
  try {
    const auth_response = await axios.post(AUTH_URL + "/signup", {
      email,
      password,
    });

    await prisma.users.create({
      data: {
        id: auth_response.data.userId,
        name,
        email,
      },
    });
    return res.json({ token: auth_response.data.token }).status(200);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        return res.status(400).json({ message: "User already exists" });
      }

      return res
        .status(500)
        .json({ message: "Auth: Failed to create account" });
    }
    return res
      .status(500)
      .json({ message: "Server: Failed to create account" });
  }
});

userRouter.use(authenticate);

userRouter.get("/", async (req, res) => {
  console.log(`User ID: ${req.headers["user_id"]}`);
  const users = await prisma.users.findMany();

  return res.json(users).status(200);
});

userRouter.get("/starred_cafes", async (req, res) => {
  const user_id = req.headers["user_id"] as string;

  const starred_cafes = await prisma.starred_Cafes.findMany({
    where: {
      user_id: user_id,
    },
    select: {
      cafe_id: true,
      Cafe: {
        select: {
          name: true,
        },
      },
    },
  });

  const formatted_cafes = starred_cafes.map((cafe) => {
    return {
      cafe_id: cafe.cafe_id,
      name: cafe.Cafe.name,
    };
  });

  return res.json(formatted_cafes).status(200);
});

// Let a user star a cafe, or unstar a cafe, requires user_id and cafe_id
userRouter.post("/star", async (req, res) => {
  console.log("Star handlign");
  const user_id = req.headers["user_id"] as string;
  const { cafe_id, star } = req.body;

  const cafe = await prisma.cafes.findFirst({
    where: {
      id: cafe_id,
    },
  });

  if (!cafe) {
    return res.status(400).json({ message: "Cafe not found" });
  }

  try {
    if (star) {
      await prisma.starred_Cafes.create({
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

      return res.json({ message: "Cafe unstarred" }).status(200);
    }
  } catch (error) {
    return res.status(400).json({ message: "Failed" });
  }
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
  // const userId = req.headers["user_id"] as string;
  const userId = "clzigzmix0000uhsgwr1z9n5q";

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  console.log(`Deleting user with id: ${userId}`);

  await axios.delete(AUTH_URL + "/delete/" + userId);

  await prisma.users.delete({
    where: {
      id: userId,
    },
  });

  return res.status(200).json({ message: "User deleted" });
});

export default userRouter;

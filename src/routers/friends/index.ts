import { Router } from "express";
import prisma from "../../database";

const friendRouter = Router();

interface IFriendParams {
  user_id: string;
  friend_id: string;
}

friendRouter.post("/", async (req, res) => {
  const { user_id, friend_id } = req.body as IFriendParams;

  const user = await prisma.users.findFirst({
    where: {
      id: user_id,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const friend = await prisma.users.findFirst({
    where: {
      id: friend_id,
    },
  });

  if (!friend) {
    return res.status(400).json({ message: "Friend not found" });
  }

  try {
    const response = await prisma.friends.create({
      data: {
        User: {
          connect: {
            id: user_id,
          },
        },
        Friend_User: {
          connect: {
            id: friend_id,
          },
        },
      },
    });
    return res.json(response).status(200);
  } catch (err) {
    return res.json({ message: err }).status(500);
  }
});

friendRouter.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  const user = await prisma.users.findFirst({
    where: {
      id: user_id,
    },
    include: {
      Friends: {
        include: {
          Friend_User: true,
        },
      },
    },
  });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  return res.json(user.Friends).status(200);
});

export default friendRouter;

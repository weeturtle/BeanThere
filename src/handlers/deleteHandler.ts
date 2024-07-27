import { Request, Response } from "express";
import prisma from "../database";

const deleteHandler = async (req: Request, res: Response) => {
  const userId = req.params.id;
  console.log(`Deleting user with ID: ${userId}`);

  await prisma.users.delete({
    where: {
      id: userId,
    },
  });

  await prisma.sessions.deleteMany({
    where: {
      userId: userId,
    },
  });

  return res.status(200).json({ message: "User deleted" });
};

export default deleteHandler;

import { Request, Response } from "express";
import prisma from "../database";

const usersHandler = async (_: Request, res: Response) => {
  const users = await prisma.users.findMany({
    select: {
      id: true,
      email: true,
    },
  });

  return res.json(users).status(200);
};

export default usersHandler;

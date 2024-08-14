import { Request, Response } from "express";
import tokenFromHeader from "../utils/tokenFromHeader";
import prisma from "../database";

const logoutHandler = async (req: Request, res: Response) => {
  const token = tokenFromHeader(req);

  if (!token) {
    return res.json({ message: "No token provided" }).status(401);
  }

  const response = await prisma.sessions.deleteMany({
    where: {
      token: token,
    },
  });

  return res.json({ message: "Logged out" }).status(200);
};

export default logoutHandler;

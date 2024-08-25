import { Request, Response } from "express";
import prisma from "../database";

interface IClearTokenParams {
  userId?: string;
}

const clearTokenHandler = async (req: Request, res: Response) => {
  const { userId } = req.body as IClearTokenParams;

  try {
    if (userId) {
      console.log(`Clearing tokens for user with ID: ${userId}`);
      await prisma.sessions.deleteMany({
        where: {
          userId: userId,
        },
      });
    } else {
      console.log("Clearing all tokens");
      await prisma.sessions.deleteMany();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to clear tokens" });
  }

  return res.status(200).json({ message: "Tokens cleared" });
};

export default clearTokenHandler;

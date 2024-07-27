import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import SECRET from "../secret";
import prisma from "../database";
import tokenFromHeader from "../utils/tokenFromHeader";

const verifyHandler = async (req: Request, res: Response) => {
  const token = tokenFromHeader(req);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const session = await verifyToken(token);
  console.log(session);

  if (!session || typeof session !== "object") {
    return res.status(401).json({ message: "Invalid token" });
  }

  const session_details = await prisma.sessions.findFirst({
    where: {
      id: session.id,
    },
  });

  if (!session_details) {
    return res.status(401).json({ message: "Invalid token" });
  }

  return res
    .status(200)
    .json({ message: "Valid token", userId: session_details.userId });
};

const verifyToken = async (token: string) => {
  try {
    const session = jwt.verify(token, SECRET);
    return session;
  } catch (err) {
    return false;
  }
};

export default verifyHandler;

import { Request, Response } from "express";
import prisma from "../database";
import bcrypt from "bcrypt";
import issueNewToken from "../utils/issueNewToken";

interface ILoginParams {
  email: string;
  password: string;
}

const verifyCred = async (email: string, password: string) => {
  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return false;
  }

  const match = await bcrypt.compare(password, user.password);

  return match ? user : false;
};

const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body as ILoginParams;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const match = await verifyCred(email, password);

  if (!match) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = await issueNewToken(match.id);

  return res.json({ token }).status(200);
};

export default loginHandler;

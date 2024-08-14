import { Response, Request } from "express";
import prisma from "../database";
import bcrypt from "bcrypt";
import issueNewToken from "../utils/issueNewToken";

interface ISignup {
  email: string;
  password: string;
}

const signupHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body as ISignup;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });

  if (user) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const response = await prisma.users.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  const token = await issueNewToken(response.id);

  return res
    .status(200)
    .json({ message: "Signup successful", token, userId: response.id });
};

export default signupHandler;

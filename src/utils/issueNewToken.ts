import { randomUUID } from "crypto";
import prisma from "../database";
import jwt from "jsonwebtoken";
import SECRET from "../secret";

const issueNewToken = async (user_id: string) => {
  const sessionID = randomUUID();

  const token = jwt.sign({ id: sessionID }, SECRET, {
    expiresIn: "30m",
  });

  console.log(
    `Created new token for user ${user_id} with session id ${sessionID}`,
  );

  const response = await prisma.sessions.create({
    data: {
      id: sessionID,
      token: token,
      userId: user_id,
    },
  });

  return token;
};

export default issueNewToken;

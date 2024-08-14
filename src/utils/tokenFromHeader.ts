import { Request } from "express";

const tokenFromHeader = (req: Request): string | undefined => {
  const authHeader = req.headers?.["authorization"];

  return authHeader && authHeader.split(" ")[1];
};

export default tokenFromHeader;

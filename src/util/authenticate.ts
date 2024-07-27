import axios, { AxiosResponse } from "axios";
import { Request, Response, NextFunction } from "express";
import { AUTH_URL } from "./envs";

interface AuthResponse {
  message: string;
  user_id: string;
}

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let response: AxiosResponse<AuthResponse>;
  try {
    response = await axios.get(AUTH_URL + "/verify", {
      headers: {
        Authorization: req.headers.authorization,
      },
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (response.status !== 200) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.headers.user_id = response.data.user_id;
  next();
};

export default authenticate;

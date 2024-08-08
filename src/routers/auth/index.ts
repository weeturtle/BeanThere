import { Router } from "express";
import axios from "axios";
import { AUTH_URL } from "../../util/envs";
import prisma from "../../database";

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing information" });
  }

  try {
    const auth_response = await axios.post(`${AUTH_URL}/login`, {
      email,
      password,
    });

    return res.json(auth_response.data).status(200);
  } catch (error) {
    return res.status(401).json({ message: "Failed to login" });
  }
});

authRouter.post("/logout", async (req, res) => {
  if (!req.headers["authorization"]) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const response = await axios.post(
      `${AUTH_URL}/logout`,
      {},
      {
        headers: {
          Authorization: req.headers["authorization"],
        },
      },
    );

    return res.json(response.data).status(200);
  } catch (error) {
    return res.status(401).json({ message: "Failed to logout" });
  }
});

authRouter.get("/verify", async (req, res) => {
  try {
    const response = await axios.get(`${AUTH_URL}/verify`, {
      headers: {
        Authorization: req.headers["authorization"],
      },
    });

    return res.json(response.data).status(200);
  } catch (error) {
    return res.status(401).json({ message: "Invalid" });
  }
});

export default authRouter;

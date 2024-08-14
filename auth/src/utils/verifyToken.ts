import jwt from "jsonwebtoken";
import SECRET from "../secret";

const verifyToken = async (token: string) => {
  try {
    const session = jwt.verify(token, SECRET);
    return session;
  } catch (err) {
    return false;
  }
};

export default verifyToken;

import axios from "axios";
import { AUTH_URL } from "./envs";
import { AuthContext } from "../graph/types";

interface AuthResponse {
  user_id: string;
  message: string;
}

const authenticate = async (context: unknown): Promise<AuthResponse | null> => {
  // console.log((context as AuthContext).token);
  try {
    const response = await axios.get<AuthResponse>(AUTH_URL + "/verify", {
      headers: {
        Authorization: (context as AuthContext).token,
      },
    });

    if (response.status !== 200) {
      return null;
    }

    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default authenticate;

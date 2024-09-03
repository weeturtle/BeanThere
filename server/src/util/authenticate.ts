import axios, { AxiosError } from "axios";
import { AUTH_URL } from "./envs";

export interface AuthContext {
  user_id?: string;
}

const authenticate = async (token?: string): Promise<AuthContext> => {
  try {
    console.log(`Auth: Verifying token ${token}`);

    if (!token) {
      return {};
    }

    const response = await axios.get<AuthContext>(AUTH_URL + "/verify", {
      headers: {
        Authorization: token,
      },
    });

    if (response.status !== 200) {
      return {};
    }

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error(`Auth: Verify token error: ${e.message}`);
    }

    return {};
  }
};

export default authenticate;

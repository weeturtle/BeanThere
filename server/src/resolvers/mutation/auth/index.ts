import { GraphQLError } from "graphql";
import { axiosAuthClient } from "../../../util/envs";
import authenticate from "../../../util/authenticate";

interface ILoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

interface IClearTokensRequest {
  user_id?: string;
}

const authMutationResolvers = {
  login: async (
    _: any,
    { input: { email, password } }: { input: ILoginRequest },
  ): Promise<AuthResponse | null> => {
    try {
      const response = await axiosAuthClient.post("/login", {
        email,
        password,
      });

      if (response.status !== 200) {
        throw new GraphQLError("Unauthorized");
      }

      return { token: response.data.token };
    } catch (e) {
      console.error(e);
      throw new GraphQLError("Unauthorized");
    }
  },
  logout: async (): Promise<boolean> => {
    try {
      const response = await axiosAuthClient.post("/logout");

      if (response.status !== 200) {
        throw new GraphQLError("Unable to logout");
      }

      return true;
    } catch (e) {
      console.error(e);
      throw new GraphQLError("Unable to logout");
    }
  },
  clear_tokens: async (_: any, { input }: { input: IClearTokensRequest }) => {
    const response = await axiosAuthClient.post("/clearTokens", {
      userId: input.user_id,
    });

    if (response.status !== 200) {
      throw new GraphQLError("Failed to clear tokens");
    }

    return true;
  },
};

export default authMutationResolvers;

import { GraphQLError } from "graphql";
import { axiosAuthClient } from "../../util/envs";
import prisma from "../../database";

interface ILoginRequest {
  email: string;
  password: string;
}

interface IRegisterRequest {
  email: string;
  name: string;
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
  register: async (
    _: any,
    { input: { name, email, password } }: { input: IRegisterRequest },
  ): Promise<AuthResponse | null> => {
    try {
      const response = await axiosAuthClient.post("/register", {
        email,
        password,
      });

      if (response.status !== 200) {
        throw new GraphQLError("Unauthorized");
      }

      prisma.users.create({
        data: {
          id: response.data.id,
          email: email,
          name: name,
        },
      });

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
  verify: async (
    _: any,
    { input: { token } }: { input: { token: string } },
  ) => {
    console.log(`Testing token: ${token}`);
    try {
      const response = await axiosAuthClient.get("/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new GraphQLError("Unauthorized");
      }

      return true;
    } catch (e) {
      return false;
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

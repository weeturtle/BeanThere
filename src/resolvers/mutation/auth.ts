import { GraphQLError } from "graphql";
import { axiosAuthClient } from "../../util/envs";

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
    { name, email, password }: IRegisterRequest,
  ): Promise<AuthResponse | null> => {
    try {
      const response = await axiosAuthClient.post("/register", {
        name,
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
};

export default authMutationResolvers;

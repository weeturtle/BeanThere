import { GraphQLError } from "graphql";
import prisma from "../../../database";
import { axiosAuthClient } from "../../../util/envs";

interface INewUser {
  name: string;
  email: string;
  password: string;
}

const userResolvers = {
  remove_user: async (_: any, { id }: { id: string }) => {
    const response = await axiosAuthClient.delete(`/delete/${id}`);

    if (response.status !== 200) {
      throw new GraphQLError("Auth: Failed to delete user");
    }

    try {
      await prisma.users.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  add_user: async (
    _: any,
    { input: { name, email, password } }: { input: INewUser },
  ) => {
    try {
      // First attempt adding the user to the auth service

      const response = await axiosAuthClient.post("/register", {
        email,
        password,
      });

      if (response.status !== 200) {
        throw new GraphQLError("Auth: Failed to add user");
      }

      const { token, id } = response.data as { token: string; id: string };

      console.log(`Added user ${name} with id ${id} to auth service`);

      // If the user was successfully added to the auth service, add them to the database
      const prismaResponse = await prisma.users.create({
        data: {
          id,
          name,
          email,
        },
      });

      console.log(`Added user ${name} with id ${id} to database`);

      return { token };
    } catch (e) {
      console.log(e);
      throw new GraphQLError("Failed to add user");
    }
  },
};

export default userResolvers;

import prisma from "../database";
import axios from "axios";
import { AUTH_URL } from "./envs";

// This should compare all users in the servers user store and the auth user store

interface IUser {
  id: string;
  email: string;
}

const MatchTest = async () => {
  const serverUsers = await prisma.users.findMany({
    select: {
      id: true,
      email: true,
    },
  });

  console.group("User Test");
  console.log("Server Users: ", serverUsers);

  const axiosResponse = await axios.get<IUser[]>(AUTH_URL + "/users");

  const authUsers = axiosResponse.data;
  console.log("Auth Users: ", authUsers);
  console.groupEnd();

  if (serverUsers.length !== authUsers.length) {
    return false;
  }

  const results = serverUsers.filter(
    ({ id: serverId, email: serverEmail }) =>
      !authUsers.some(
        ({ id: authId, email: authEmail }) =>
          serverId === authId && serverEmail === authEmail,
      ),
  );

  console.log(results);

  return results.length === 0;
};

export default MatchTest;

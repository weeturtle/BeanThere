import prisma from "../../../database";

const userResolvers = {
  remove_user: async (_: any, { id }: { id: string }) => {
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
};

export default userResolvers;

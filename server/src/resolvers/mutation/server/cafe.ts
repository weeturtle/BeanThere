import prisma from "../../../database";
import { Cafe } from "../../../graph/types";

interface INewCafe {
  name: string;
  description: string;
  address: string;
  city: string;
  opening_times: IOpeningTimes[];
}

interface IOpeningTimes {
  day: string;
  time: string;
}

const cafeResolvers = {
  add_cafe: async (
    _: any,
    {
      input: { name, address, city, description, opening_times },
    }: { input: INewCafe },
  ): Promise<Cafe | null> => {
    return prisma.cafes.create({
      data: {
        name,
        address,
        city,
        description,
        Opening_Times: {
          create: opening_times,
        },
      },
    });
  },
  remove_cafe: async (_: any, { id }: { id: string }): Promise<boolean> => {
    try {
      await prisma.cafes.delete({
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

export default cafeResolvers;

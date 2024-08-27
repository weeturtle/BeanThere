import cafeResolvers from "./cafe";
import friendResolvers from "./friend";
import reviewResolvers from "./review";
import userResolvers from "./user";

const serverMutationResolvers = {
  ...cafeResolvers,
  ...friendResolvers,
  ...reviewResolvers,
  ...userResolvers,
};

export default serverMutationResolvers;

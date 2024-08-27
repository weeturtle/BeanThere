import cafeResolvers from "./cafe";
import friendResolvers from "./friend";
import reviewResolvers from "./review";

const serverMutationResolvers = {
  ...cafeResolvers,
  ...friendResolvers,
  ...reviewResolvers,
};

export default serverMutationResolvers;

import serverMutationResolvers from "./server";
import authMutationResolvers from "./auth";

const mutationResolver = {
  ...serverMutationResolvers,
  ...authMutationResolvers,
};

export default mutationResolver;

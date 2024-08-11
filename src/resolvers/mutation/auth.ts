const authMutationResolvers = {
  login: async (parent: any, args: any, context: any) => {
    return { token: "test token" };
  },
  register: async (parent: any, args: any, context: any) => {
    return { token: "test token" };
  },
};

export default authMutationResolvers;

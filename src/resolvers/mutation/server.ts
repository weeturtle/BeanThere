const serverMutationResolvers = {
  add_review: async (parent: any, args: any, context: any) => {
    return {
      id: 1,
      rating: 5,
      review: "Great cafe",
      drink: "Latte",
      time: "2021-01-01",
    };
  },
  add_cafe: async (parent: any, args: any, context: any) => {
    return {
      id: 1,
      name: "Cafe 1",
      description: "Cafe 1",
      address: "1234 Cafe St",
      city: "Cafe City",
    };
  },
  add_friend: async (parent: any, args: any, context: any) => {
    return { id: 1, email: "chris@gmail.com", name: "Chris" };
  },
};

export default serverMutationResolvers;

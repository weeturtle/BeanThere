const queryResolver = {
  user: async (parent: any, args: any, context: any) => {
    return { id: 1, email: "max@gmail.com", name: "Max" };
  },
  cafe: async (parent: any, args: any, context: any) => {
    return {
      id: 1,
      name: "Cafe 1",
      description: "Cafe 1",
      address: "1234 Cafe St",
      city: "Cafe City",
    };
  },
  review: async (parent: any, args: any, context: any) => {
    return {
      id: 1,
      rating: 5,
      review: "Great cafe",
      drink: "Latte",
      time: "2021-01-01",
    };
  },
  cafes: async (parent: any, args: any, context: any) => {
    return [
      {
        id: 1,
        name: "Cafe 1",
        description: "Cafe 1",
        address: "1234 Cafe St",
        city: "Cafe City",
      },
    ];
  },
};

export default queryResolver;

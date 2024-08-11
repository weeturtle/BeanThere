"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serverMutationResolvers = {
    add_review: async (parent, args, context) => {
        return {
            id: 1,
            rating: 5,
            review: "Great cafe",
            drink: "Latte",
            time: "2021-01-01",
        };
    },
    add_cafe: async (parent, args, context) => {
        return {
            id: 1,
            name: "Cafe 1",
            description: "Cafe 1",
            address: "1234 Cafe St",
            city: "Cafe City",
        };
    },
    add_friend: async (parent, args, context) => {
        return { id: 1, email: "chris@gmail.com", name: "Chris" };
    },
};
exports.default = serverMutationResolvers;
//# sourceMappingURL=server.js.map
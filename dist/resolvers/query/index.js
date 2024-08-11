"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryResolver = {
    user: async (parent, args, context) => {
        return { id: 1, email: "max@gmail.com", name: "Max" };
    },
    cafe: async (parent, args, context) => {
        return {
            id: 1,
            name: "Cafe 1",
            description: "Cafe 1",
            address: "1234 Cafe St",
            city: "Cafe City",
        };
    },
    review: async (parent, args, context) => {
        return {
            id: 1,
            rating: 5,
            review: "Great cafe",
            drink: "Latte",
            time: "2021-01-01",
        };
    },
    cafes: async (parent, args, context) => {
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
exports.default = queryResolver;
//# sourceMappingURL=index.js.map
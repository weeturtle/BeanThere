"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./user");
const queryResolver = {
    user: user_1.userQueryByEmail,
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
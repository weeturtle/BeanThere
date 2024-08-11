"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reviewResolver = {
    User: async (review) => {
        return { id: 1, email: "max@gmail.com", name: "Max" };
    },
    Cafe: async (review) => {
        return {
            id: 1,
            name: "Cafe 1",
            description: "Cafe 1",
            address: "1234 Cafe St",
            city: "Cafe City",
        };
    },
    Photos: async (review) => {
        return [{ id: 1, key: "photo1.jpg" }];
    },
};
exports.default = reviewResolver;
//# sourceMappingURL=review.js.map
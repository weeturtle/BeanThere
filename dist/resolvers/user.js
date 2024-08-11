"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userResolver = {
    Friends: async (user) => {
        console.log("Fetching friends");
        return [{ id: 1, email: "ali@gmail.com", name: "Ali" }];
    },
    Starred_Cafes: (user) => {
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
    Reviews: async (user) => {
        return [
            {
                id: 1,
                rating: 5,
                review: "Great cafe",
                drink: "Latte",
                time: "2021-01-01",
            },
        ];
    },
};
exports.default = userResolver;
//# sourceMappingURL=user.js.map
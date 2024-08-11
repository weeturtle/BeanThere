"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cafeResolver = {
    Reviews: async (cafe) => {
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
exports.default = cafeResolver;
//# sourceMappingURL=cafe.js.map
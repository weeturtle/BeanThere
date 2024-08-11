"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authMutationResolvers = {
    login: async (parent, args, context) => {
        return { token: "test token" };
    },
    register: async (parent, args, context) => {
        return { token: "test token" };
    },
};
exports.default = authMutationResolvers;
//# sourceMappingURL=auth.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQueryByEmail = void 0;
const database_1 = __importDefault(require("../../database"));
const userQueryByEmail = async (_, { email }, context) => {
    return database_1.default.users.findUnique({ where: { email } });
};
exports.userQueryByEmail = userQueryByEmail;
//# sourceMappingURL=user.js.map
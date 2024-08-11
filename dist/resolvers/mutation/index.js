"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const auth_1 = __importDefault(require("./auth"));
const mutationResolver = {
    ...server_1.default,
    ...auth_1.default,
};
exports.default = mutationResolver;
//# sourceMappingURL=index.js.map
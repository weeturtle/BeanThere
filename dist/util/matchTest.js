"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const axios_1 = __importDefault(require("axios"));
const envs_1 = require("./envs");
const MatchTest = async () => {
    const serverUsers = await database_1.default.users.findMany({
        select: {
            id: true,
            email: true,
        },
    });
    console.group("User Test");
    console.log("Server Users: ", serverUsers);
    const axiosResponse = await axios_1.default.get(envs_1.AUTH_URL + "/users");
    const authUsers = axiosResponse.data;
    console.log("Auth Users: ", authUsers);
    console.groupEnd();
    if (serverUsers.length !== authUsers.length) {
        return false;
    }
    const results = serverUsers.filter(({ id: serverId, email: serverEmail }) => !authUsers.some(({ id: authId, email: authEmail }) => serverId === authId && serverEmail === authEmail));
    console.log(results);
    return results.length === 0;
};
exports.default = MatchTest;
//# sourceMappingURL=matchTest.js.map
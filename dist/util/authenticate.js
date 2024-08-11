"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const envs_1 = require("./envs");
const authenticate = async (req, res, next) => {
    let response;
    try {
        response = await axios_1.default.get(envs_1.AUTH_URL + "/verify", {
            headers: {
                Authorization: req.headers.authorization,
            },
        });
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
    if (response.status !== 200) {
        return res.status(401).json({ message: "Invalid token" });
    }
    req.headers.user_id = response.data.user_id;
    next();
};
exports.default = authenticate;
//# sourceMappingURL=authenticate.js.map
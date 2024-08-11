"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const envs_1 = require("../../util/envs");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Missing information" });
    }
    try {
        const auth_response = await axios_1.default.post(`${envs_1.AUTH_URL}/login`, {
            email,
            password,
        });
        return res.json(auth_response.data).status(200);
    }
    catch (error) {
        return res.status(401).json({ message: "Failed to login" });
    }
});
authRouter.post("/logout", async (req, res) => {
    if (!req.headers["authorization"]) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const response = await axios_1.default.post(`${envs_1.AUTH_URL}/logout`, {}, {
            headers: {
                Authorization: req.headers["authorization"],
            },
        });
        return res.json(response.data).status(200);
    }
    catch (error) {
        return res.status(401).json({ message: "Failed to logout" });
    }
});
authRouter.get("/verify", async (req, res) => {
    try {
        const response = await axios_1.default.get(`${envs_1.AUTH_URL}/verify`, {
            headers: {
                Authorization: req.headers["authorization"],
            },
        });
        return res.json(response.data).status(200);
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid" });
    }
});
exports.default = authRouter;
//# sourceMappingURL=index.js.map
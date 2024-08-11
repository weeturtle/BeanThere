"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../../database"));
const axios_1 = __importStar(require("axios"));
const envs_1 = require("../../util/envs");
const authenticate_1 = __importDefault(require("../../util/authenticate"));
const matchTest_1 = __importDefault(require("../../util/matchTest"));
const userRouter = (0, express_1.Router)();
userRouter.get("/test", async (_, res) => {
    const result = await (0, matchTest_1.default)();
    return res.json({ result }).status(200);
});
userRouter.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing information" });
    }
    console.log("Error check start");
    try {
        const auth_response = await axios_1.default.post(envs_1.AUTH_URL + "/signup", {
            email,
            password,
        });
        await database_1.default.users.create({
            data: {
                id: auth_response.data.userId,
                name,
                email,
            },
        });
        return res.json({ token: auth_response.data.token }).status(200);
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            if (error.response?.status === 400) {
                return res.status(400).json({ message: "User already exists" });
            }
            return res
                .status(500)
                .json({ message: "Auth: Failed to create account" });
        }
        return res
            .status(500)
            .json({ message: "Server: Failed to create account" });
    }
});
userRouter.use(authenticate_1.default);
userRouter.get("/", async (req, res) => {
    console.log(`User ID: ${req.headers["user_id"]}`);
    const users = await database_1.default.users.findMany();
    return res.json(users).status(200);
});
userRouter.get("/starred_cafes", async (req, res) => {
    const user_id = req.headers["user_id"];
    const starred_cafes = await database_1.default.starred_Cafes.findMany({
        where: {
            user_id: user_id,
        },
        select: {
            cafe_id: true,
            Cafe: {
                select: {
                    name: true,
                },
            },
        },
    });
    const formatted_cafes = starred_cafes.map((cafe) => {
        return {
            cafe_id: cafe.cafe_id,
            name: cafe.Cafe.name,
        };
    });
    return res.json(formatted_cafes).status(200);
});
// Let a user star a cafe, or unstar a cafe, requires user_id and cafe_id
userRouter.post("/star", async (req, res) => {
    console.log("Star handlign");
    const user_id = req.headers["user_id"];
    const { cafe_id, star } = req.body;
    const cafe = await database_1.default.cafes.findFirst({
        where: {
            id: cafe_id,
        },
    });
    if (!cafe) {
        return res.status(400).json({ message: "Cafe not found" });
    }
    try {
        if (star) {
            await database_1.default.starred_Cafes.create({
                data: {
                    user_id,
                    cafe_id,
                },
            });
            return res.json({ message: "Cafe starred" }).status(200);
        }
        else {
            await database_1.default.starred_Cafes.deleteMany({
                where: {
                    user_id,
                    cafe_id,
                },
            });
            return res.json({ message: "Cafe unstarred" }).status(200);
        }
    }
    catch (error) {
        return res.status(400).json({ message: "Failed" });
    }
});
userRouter.get("/:email", async (req, res) => {
    const { email } = req.params;
    const user = await database_1.default.users.findFirst({
        where: {
            email: email,
        },
    });
    return res.json(user).status(200);
});
// Allow to search by partial name
userRouter.get("/search/:name", async (req, res) => {
    const { name } = req.params;
    const users = await database_1.default.users.findMany({
        where: {
            name: {
                contains: name,
            },
        },
    });
    return res.json(users).status(200);
});
userRouter.delete("/", async (req, res) => {
    // const userId = req.headers["user_id"] as string;
    const userId = "clzigzmix0000uhsgwr1z9n5q";
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }
    console.log(`Deleting user with id: ${userId}`);
    await axios_1.default.delete(envs_1.AUTH_URL + "/delete/" + userId);
    await database_1.default.users.delete({
        where: {
            id: userId,
        },
    });
    return res.status(200).json({ message: "User deleted" });
});
exports.default = userRouter;
//# sourceMappingURL=index.js.map
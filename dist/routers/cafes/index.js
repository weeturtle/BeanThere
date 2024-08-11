"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../../database"));
const frendCafes_1 = require("./frendCafes");
const cafeRouter = (0, express_1.Router)();
cafeRouter.post("/", async (req, res) => {
    const cafe_info = req.body;
    const response = await database_1.default.cafes.create({
        data: {
            name: cafe_info.name,
            description: cafe_info.description,
            address: cafe_info.address,
            city: cafe_info.city,
        },
    });
    return res.json(response).status(200);
});
cafeRouter.get("/", async (req, res) => {
    const cafes = await database_1.default.cafes.findMany();
    return res.json(cafes).status(200);
});
cafeRouter.post("/friendstarred", async (req, res) => {
    // Fetch user_id from header and cafe_id from body
    const user_id = req.headers["user_id"];
    const cafe_id = req.body["cafe_id"];
    if (!cafe_id || !user_id) {
        return res.json({ message: "Missing information" }).status(400);
    }
    const friends = await (0, frendCafes_1.findFriendStarredCafes)(user_id, cafe_id);
    return res.json(friends).status(200);
});
cafeRouter.get("/:city", async (req, res) => {
    const { city } = req.params;
    const cafes = await database_1.default.cafes.findMany({
        where: {
            city: city,
        },
    });
    return res.json(cafes).status(200);
});
exports.default = cafeRouter;
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../../database"));
const authenticate_1 = __importDefault(require("../../util/authenticate"));
const friendRouter = (0, express_1.Router)();
friendRouter.use(authenticate_1.default);
// Fetch friends of signed in user
friendRouter.get("/", async (_, res) => {
    const user_id = _.headers["user_id"];
    const friends = await database_1.default.friends.findMany({
        where: {
            user_id,
        },
        select: {
            Friend_User: true,
        },
    });
    const formattedFriends = friends.map((friend) => friend.Friend_User);
    return res.json(formattedFriends).status(200);
});
friendRouter.get("/find", async (req, res) => {
    const user_id = req.headers["user_id"];
    const { search } = req.query;
    // Include whether they're friends or not'
    // This is a naive implementation, and should be optimized
    //
    // This query is not optimized and should be optimized
    const allMatches = await database_1.default.users.findMany({
        where: {
            NOT: {
                id: user_id,
            },
            OR: [
                {
                    name: {
                        startsWith: search,
                        mode: "insensitive",
                    },
                },
                {
                    email: {
                        startsWith: search,
                        mode: "insensitive",
                    },
                },
            ],
        },
        select: {
            id: true,
            name: true,
        },
        take: 10,
    });
    // Include whether they're friends or not
    //
    const friends = await database_1.default.friends.findMany({
        where: {
            user_id,
        },
        select: {
            Friend_User: {
                select: {
                    id: true,
                },
            },
        },
    });
    const friendIds = friends.map((friend) => friend.Friend_User.id);
    const allMatchesWithFriendStatus = allMatches.map((match) => {
        if (friendIds.includes(match.id)) {
            return {
                ...match,
                isFriend: true,
            };
        }
        return {
            ...match,
            isFriend: false,
        };
    });
    return res.json(allMatchesWithFriendStatus).status(200);
});
friendRouter.delete("/:id", async (req, res) => {
    const user_id = req.headers["user_id"];
    const { id } = req.params;
    // Delete the friend relationship
    try {
        await database_1.default.friends.delete({
            where: {
                user_id_friend_user_id: {
                    user_id,
                    friend_user_id: id,
                },
            },
        });
        return res.status(200).json({ message: "Friend deleted" });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
friendRouter.post("/", async (req, res) => {
    const user_id = req.headers["user_id"];
    const { friend_id } = req.body;
    const friend = await database_1.default.users.findFirst({
        where: {
            id: friend_id,
        },
    });
    if (!friend) {
        return res.status(400).json({ message: "Friend not found" });
    }
    try {
        const response = await database_1.default.friends.create({
            data: {
                User: {
                    connect: {
                        id: user_id,
                    },
                },
                Friend_User: {
                    connect: {
                        id: friend_id,
                    },
                },
            },
        });
        return res.json(response).status(200);
    }
    catch (err) {
        return res.json({ message: err }).status(500);
    }
});
exports.default = friendRouter;
//# sourceMappingURL=index.js.map
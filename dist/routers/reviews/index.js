"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../../database"));
const authenticate_1 = __importDefault(require("../../util/authenticate"));
const reviewRouter = (0, express_1.Router)();
reviewRouter.use(authenticate_1.default);
reviewRouter.post("/", async (req, res) => {
    const user_id = req.headers["user_id"];
    const review_info = req.body;
    const response = await database_1.default.reviews.create({
        data: {
            rating: review_info.rating,
            review: review_info.review,
            drink: review_info.drink,
            Cafe: {
                connect: {
                    id: review_info.cafe_id,
                },
            },
            User: {
                connect: {
                    id: user_id,
                },
            },
        },
    });
    const tagged_users = review_info.tagged_users;
    if (tagged_users) {
        database_1.default.tagged_User_Reviews.createMany({
            data: tagged_users.map((user_id) => {
                return {
                    review_id: response.id,
                    user_id: user_id,
                };
            }),
        });
    }
    // Ignore photos for now
    return res.json(response).status(200);
});
// Fetches all reviews made by the user of their friends
reviewRouter.get("/dashboard", async (req, res) => {
    const user_id = req.headers["user_id"];
    const friends_reviews = await database_1.default.friends.findMany({
        where: {
            user_id: user_id,
        },
        include: {
            Friend_User: {
                include: {
                    Reviews: {
                        include: {
                            Cafe: true,
                        },
                    },
                },
            },
        },
        take: 10,
    });
    // Flatten the reviews into a single array
    const flat_friend_review = friends_reviews
        .map((friend) => {
        return friend.Friend_User.Reviews.map((review) => {
            return {
                ...review,
                name: friend.Friend_User.name,
            };
        });
    })
        .flat();
    const reviews = await database_1.default.reviews.findMany({
        where: {
            user_id: user_id,
        },
        include: {
            Cafe: true,
        },
    });
    return res.json([...flat_friend_review, ...reviews]);
});
reviewRouter.get("/", async (req, res) => {
    // Fetch all review for the dashboard
    // Include all the information stated in the format.yaml file
    const user_id = req.headers["user_id"];
    //  Fetch if the cafe is starred by the user
    const reviews = await database_1.default.users.findMany({
        where: {
            id: user_id,
        },
        select: {
            Friends: {
                select: {
                    Friend_User: {
                        select: {
                            // Friend information
                            id: true,
                            name: true,
                            // Reviews by the friend
                            Reviews: {
                                select: {
                                    // Review information
                                    id: true,
                                    time: true,
                                    rating: true,
                                    drink: true,
                                    review: true,
                                    // Cafe review is for
                                    Cafe: {
                                        select: {
                                            // Cafe information
                                            id: true,
                                            name: true,
                                            address: true,
                                            // If cafe_id and user_id is in the starred_cafes table
                                            // then the cafe is starred by the user
                                            Starred_Cafes: {
                                                select: {
                                                    user_id: true,
                                                },
                                                where: {
                                                    user_id: user_id,
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    console.log(reviews);
    return res.json(reviews).status(200);
});
reviewRouter.get("/:user_id", async (req, res) => {
    const { user_id } = req.params;
    const reviews = await database_1.default.reviews.findMany({
        where: {
            user_id: user_id,
        },
    });
    return res.json(reviews).status(200);
});
exports.default = reviewRouter;
//# sourceMappingURL=index.js.map
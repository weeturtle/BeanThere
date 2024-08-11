"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCommonCafeFriend = exports.findAllCommonCafe = exports.findFriendStarredCafes = void 0;
const database_1 = __importDefault(require("../../database"));
// Find all friends that have starred a passed cafe
//
const findFriendStarredCafes = async (user_id, cafe_id) => {
    const friends = await database_1.default.friends.findMany({
        where: {
            user_id,
            Friend_User: {
                Starred_Cafes: {
                    some: {
                        cafe_id,
                    },
                },
            },
        },
        select: {
            Friend_User: true,
        },
    });
    return friends;
};
exports.findFriendStarredCafes = findFriendStarredCafes;
const findAllCommonCafe = async (user_id) => {
    const userStarredCafes = await database_1.default.starred_Cafes.findMany({
        where: {
            user_id,
        },
        select: {
            cafe_id: true,
        },
    });
    const cafes = await database_1.default.friends.findMany({
        where: {
            user_id,
            Friend_User: {
                Starred_Cafes: {
                    some: {
                        cafe_id: {
                            in: userStarredCafes.map((cafe) => cafe.cafe_id),
                        },
                    },
                },
            },
        },
        select: {
            Friend_User: {
                select: {
                    id: true,
                    Starred_Cafes: {
                        select: {
                            cafe_id: true,
                        },
                    },
                },
            },
        },
    });
    const formattedCafes = {};
    for (let { Friend_User: { id, Starred_Cafes }, } of cafes) {
        for (let { cafe_id } of Starred_Cafes) {
            if (cafe_id in formattedCafes) {
                formattedCafes[cafe_id].push(id);
            }
            else {
                formattedCafes[cafe_id] = [id];
            }
        }
    }
    return formattedCafes;
};
exports.findAllCommonCafe = findAllCommonCafe;
const findCommonCafeFriend = async (user_id, friend_ids) => {
    const all_ids = [user_id, ...friend_ids];
    // TODO: Double check this returns desired values
    const starred_cafes = await database_1.default.cafes.findMany({
        where: {
            Starred_Cafes: {
                every: {
                    User: {
                        id: {
                            in: all_ids,
                        },
                    },
                },
            },
        },
        select: {
            id: true,
        },
    });
    return starred_cafes;
};
exports.findCommonCafeFriend = findCommonCafeFriend;
//# sourceMappingURL=frendCafes.js.map
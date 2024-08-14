import { cafeQueryById, cafesQuery } from "./cafe";
import { allReviewQuery, reviewQueryById } from "./review";
import { userFriendsQuery, userQuery } from "./user";

const queryResolver = {
  user: userQuery,
  cafe: cafeQueryById,
  review: reviewQueryById,
  cafes: cafesQuery,
  reviews: allReviewQuery,
  searchUser: userFriendsQuery,
};

export default queryResolver;

import { verifyQuery } from "./auth";
import { cafeQuery, cafesQuery } from "./cafe";
import { relevantReviewsQuery, reviewQueryById } from "./review";
import matchUserTestQuery from "./tests";
import { userFriendsQuery, userQuery } from "./user";

const queryResolver = {
  user: userQuery,
  cafe: cafeQuery,
  review: reviewQueryById,
  cafes: cafesQuery,
  reviews: relevantReviewsQuery,
  searchUser: userFriendsQuery,
  matchUserTest: matchUserTestQuery,
  verify: verifyQuery,
};

export default queryResolver;

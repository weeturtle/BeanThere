import { cafeQueryById, cafesQuery } from "./cafe";
import { allReviewQuery, reviewQueryById } from "./review";
import { userQuery } from "./user";

const queryResolver = {
  user: userQuery,
  cafe: cafeQueryById,
  review: reviewQueryById,
  cafes: cafesQuery,
  reviews: allReviewQuery,
};

export default queryResolver;

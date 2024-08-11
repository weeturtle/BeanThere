import { cafeQueryById, cafesQuery } from "./cafe";
import { allReviewQuery, reviewQueryById } from "./review";
import { userQueryByEmail } from "./user";

const queryResolver = {
  user: userQueryByEmail,
  cafe: cafeQueryById,
  review: reviewQueryById,
  cafes: cafesQuery,
  reviews: allReviewQuery,
};

export default queryResolver;

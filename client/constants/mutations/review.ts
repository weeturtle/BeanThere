import { gql } from "@apollo/client";

export const ADDREVIEW = gql`
  mutation AddReview(
    $rating: Int!
    $review: String!
    $drink: String!
    $time: String!
    $cafe_id: ID!
  ) {
    add_review(
      input: {
        rating: $rating
        review: $review
        drink: $drink
        time: $time
        cafe_id: $cafe_id
      }
    ) {
      id
    }
  }
`;

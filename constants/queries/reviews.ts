import { gql } from "@apollo/client";

export const DASHBOARD_REVIEWS = gql`
  query DashboardReviews {
    reviews {
      id
      User {
        name
      }
      drink
      rating
      review
      Cafe {
        name
        address
      }
    }
  }
`;

import { gql } from "@apollo/client";

export const DASHBOARD_REVIEWS = gql`
  query DashboardReviews {
    reviews {
      id
      time
      User {
        name
      }
      drink
      rating
      review
      Cafe {
        id
        name
        address
      }
    }
  }
`;

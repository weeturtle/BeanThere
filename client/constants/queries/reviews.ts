import { gql } from "@apollo/client";

export const DASHBOARD_REVIEWS = gql`
  query DashboardReviews {
    reviews {
      id
      time
      User {
        id
        name
      }
      drink
      rating
      review
      Cafe {
        id
        name
        address
        last_visit
      }
    }
  }
`;

export const CAFEREVIEWS = gql`
  query CafeReviews($id: ID!) {
    cafe(id: $id) {
      Reviews {
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
          last_visit
        }
      }
    }
  }
`;

export const PERSONALREVIEWS = gql`
  query PersonalReviews {
    user {
      Reviews {
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
          last_visit
        }
      }
    }
  }
`;

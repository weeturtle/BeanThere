import { gql } from "@apollo/client";

export const FETCHUSER = gql`
  query userFetch($id: String!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

// Confused requests

export const FETCHUSERREVIEWS = gql`
  query userReviews($id: String!) {
    user(id: $id) {
      Reviews {
        id
        rating
        review
        drink
        time
        Cafe {
          id
          name
          description
          address
          city
          last_visit
        }
        User {
          id
          name
        }
      }
    }
  }
`;

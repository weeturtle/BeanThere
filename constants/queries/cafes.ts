import { gql } from "@apollo/client";

export const ALLCAFES = gql`
  query AllCafes {
    cafes {
      id
      name
      address
      city
    }
  }
`;

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

export const CAFE = gql`
  query Cafe($id: ID!) {
    cafe(id: $id) {
      id
      name
      description
      address
      city
    }
  }
`;

export const SEARCHCAFE = gql`
  query SearchCafe($prompt: String!) {
    cafes(prompt: $prompt) {
      id
      name
    }
  }
`;

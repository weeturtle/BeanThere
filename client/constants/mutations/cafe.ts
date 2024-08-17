import { gql } from "@apollo/client";

export const ADDCAFE = gql`
  mutation AddCafe(
    $name: String!
    $description: String!
    $address: String!
    $city: String!
  ) {
    add_cafe(
      input: {
        name: $name
        description: $description
        address: $address
        city: $city
      }
    ) {
      id
    }
  }
`;

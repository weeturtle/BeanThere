import { gql } from "@apollo/client";

export const ALLFRIENDS = gql`
  query AllFriends {
    user {
      Friends {
        id
        name
      }
    }
  }
`;

export const FRIENDSEARCH = gql`
  query SearchUser($prompt: String!) {
    searchUser(prompt: $prompt) {
      id
      name
    }
  }
`;

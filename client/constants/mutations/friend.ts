import { gql } from "@apollo/client";

export const FOLLOW_USER = gql`
  mutation FollowUser($id: ID!) {
    add_friend(id: $id) {
      id
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($id: ID!) {
    remove_friend(id: $id) {
      id
    }
  }
`;

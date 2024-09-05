import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation Register($email: String!, $name: String!, $password: String!) {
    register(input: { email: $email, name: $name, password: $password }) {
      token
    }
  }
`;

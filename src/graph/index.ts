import { gql } from "graphql-tag";
import userResolver from "../resolvers/user";
import reviewResolver from "../resolvers/review";
import cafeResolver from "../resolvers/cafe";
import queryResolver from "../resolvers/query";
import mutationResolver from "../resolvers/mutation";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String!

    Friends: [User]!
    Starred_Cafes: [Cafe]!
    Reviews: [Review]!
  }

  type Cafe {
    id: ID!
    name: String!
    description: String!
    address: String!
    city: String!

    Reviews: [Review]!
  }

  type Review {
    id: ID!
    rating: Int!
    review: String!
    drink: String!
    time: String!

    User: User!
    Cafe: Cafe!
    Photos: [Photo]!
  }

  type Photo {
    id: ID!
    key: String!

    Cafe: Cafe!
    Review: Review!
  }

  input LoginRequest {
    email: String!
    password: String!
  }

  input RegisterRequest {
    name: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    user(email: String, id: String): User
    cafe(id: ID!): Cafe
    reviews: [Review]!
    review(id: ID!): Review
    cafes(city: String): [Cafe]!
  }

  type Mutation {
    login(input: LoginRequest!): AuthPayload
    register(input: RegisterRequest!): AuthPayload
    logout: Boolean

    add_review(
      rating: Int!
      review: String!
      drink: String!
      time: String!
      cafe_id: ID!
    ): Review
    add_cafe(
      name: String!
      description: String!
      address: String!
      city: String!
    ): Cafe
    add_friend(email: String!): User
  }
`;

export const resolvers = {
  User: userResolver,
  Cafe: cafeResolver,
  Review: reviewResolver,
  Query: queryResolver,
  Mutation: mutationResolver,
};

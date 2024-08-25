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
    last_visit: String

    OpeningTimes: [OpeningTimes]!
    Reviews: [Review]!
  }

  type OpeningTimes {
    id: ID!
    cafe_id: ID!
    day: String!
    time: String!

    Cafe: Cafe!
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

  type UserSearch {
    user: User!
    isFriend: Boolean!
  }

  input NewFriendRequest {
    email: String!
  }

  input OpeningTimesInput {
    day: String!
    time: String!
  }

  input NewCafeRequest {
    name: String!
    description: String!
    address: String!
    city: String!
    opening_times: [OpeningTimesInput]!
  }

  input NewReviewRequest {
    rating: Int!
    review: String!
    drink: String!
    time: String!
    cafe_id: ID!
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

  input VerifyRequest {
    token: String!
  }

  input ClearTokensRequest {
    user_id: ID
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    user(email: String, id: String): User
    cafe(id: ID!): Cafe
    reviews: [Review]!
    review(id: ID!): Review
    cafes(city: String, prompt: String): [Cafe]!
    searchUser(prompt: String!): [UserSearch]!
  }

  type Mutation {
    login(input: LoginRequest!): AuthPayload
    register(input: RegisterRequest!): AuthPayload
    verify(input: VerifyRequest!): Boolean
    clear_tokens(input: ClearTokensRequest!): Boolean
    logout: Boolean

    add_review(input: NewReviewRequest!): Review
    add_cafe(input: NewCafeRequest!): Cafe
    add_friend(input: NewFriendRequest!): User

    remove_cafe(id: ID!): Boolean
  }
`;

export const resolvers = {
  User: userResolver,
  Cafe: cafeResolver,
  Review: reviewResolver,
  Query: queryResolver,
  Mutation: mutationResolver,
};

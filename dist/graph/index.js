"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
const user_1 = __importDefault(require("../resolvers/user"));
const review_1 = __importDefault(require("../resolvers/review"));
const cafe_1 = __importDefault(require("../resolvers/cafe"));
const query_1 = __importDefault(require("../resolvers/query"));
const mutation_1 = __importDefault(require("../resolvers/mutation"));
exports.typeDefs = (0, graphql_tag_1.gql) `
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

  type Query {
    user(email: String!): User
    cafe(id: ID!): Cafe
    review(id: ID!): Review
    cafes: [Cafe]!
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

  type Mutation {
    login(input: LoginRequest!): AuthPayload
    register(input: RegisterRequest!): AuthPayload

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
exports.resolvers = {
    User: user_1.default,
    Cafe: cafe_1.default,
    Review: review_1.default,
    Query: query_1.default,
    Mutation: mutation_1.default,
};
//# sourceMappingURL=index.js.map
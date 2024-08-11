"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.typeDefs = (0, graphql_tag_1.gql) `
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
  }
`;
//# sourceMappingURL=auth.js.map
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs, resolvers } from "./graph";
import { AuthContext } from "./graph/types";

const main = async () => {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs,
      resolvers,
    }),
    csrfPrevention: false,
  });

  const { url } = await startStandaloneServer<AuthContext>(server, {
    listen: {
      port: 4000,
    },
    context: async ({ req }) => ({
      token: req.headers.authorization,
    }),
  });

  console.log(`🚀 Apollo ready at ${url}`);
};

main();

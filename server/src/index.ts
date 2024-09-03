import { ApolloServer, ApolloServerPlugin } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs, resolvers } from "./graph";
import { AuthContext } from "./graph/types";

const logginPlugin: ApolloServerPlugin = {
  async requestDidStart(requestContext) {
    console.log("-------------------------------------------------");
    console.group(`Request ${requestContext.request.operationName}`);
    console.log("Request started! Query:\n" + requestContext.request.query);
    console.groupEnd();

    return {
      async willSendResponse() {
        console.log("Operation resolved!");
        console.log("-------------------------------------------------");
        console.groupEnd();
      },
    };
  },
};

const main = async () => {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs,
      resolvers,
    }),
    csrfPrevention: false,
    plugins: [logginPlugin],
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

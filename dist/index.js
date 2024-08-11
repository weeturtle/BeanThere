"use strict";
// import Express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import userRouter from "./routers/users";
// import cafeRouter from "./routers/cafes";
// import reviewRouter from "./routers/reviews";
// import friendRouter from "./routers/friends";
// import authRouter from "./routers/auth";
// import { PORT, AUTH_URL } from "./util/envs";
// import prisma from "./database";
Object.defineProperty(exports, "__esModule", { value: true });
// const app = Express();
// if (!AUTH_URL) {
//   console.error("AUTH_URL is not defined");
//   process.exit(1);
// }
// if (!PORT) {
//   console.error("API_PORT is not definde");
//   process.exit(1);
// }
// app.use(bodyParser.json());
// app.use(cors());
// app.use("/user", userRouter);
// app.use("/cafe", cafeRouter);
// app.use("/review", reviewRouter);
// app.use("/friend", friendRouter);
// app.use("/auth", authRouter);
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const server_1 = require("@apollo/server");
const subgraph_1 = require("@apollo/subgraph");
const standalone_1 = require("@apollo/server/standalone");
const graph_1 = require("./graph");
const main = async () => {
    const server = new server_1.ApolloServer({
        schema: (0, subgraph_1.buildSubgraphSchema)({
            typeDefs: graph_1.typeDefs,
            resolvers: graph_1.resolvers,
        }),
        csrfPrevention: false,
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
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
//# sourceMappingURL=index.js.map
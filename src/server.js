require("dotenv").config();
import http from "http";
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  resolvers,
  playground: true,
  typeDefs,
  introspection: true,
  context: async (ctx) => {
    if (ctx.req) {
      console.log("ctx.req");
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      console.log("context ~~");
      console.log(context);

      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },
  subscriptions: {
    onConnect: async ({ token }) => {
      if (!token) {
        throw new Error("You can't listen.");
      }
      console.log("token~~~~~~~~~");
      console.log(token);
      const loggedInUser = await getUser(token);
      console.log("Logged~~~~~~~~~~~");
      console.log(loggedInUser);
      return {
        loggedInUser,
      };
    },
  },
});

const app = express();
// app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀Server is running on http://localhost:${PORT}/graphql ✅`);
});

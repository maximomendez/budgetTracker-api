import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildContext } from "graphql-passport";
import { connectDb } from "./db/connectDb.js";
import { configurePassport } from "./passport/passport.js";
import mergeSchemasArray from "./schemas/index.js";
import mergeResolversArray from "./resolvers/index.js";

import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";

dotenv.config();
configurePassport();

const app = express();
const httpServer = http.createServer(app);
const MongoDBStore = new connectMongo(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  databaseName: 'budgetTracker',
  collection: "sessions",
});

store.on("Store Error", (error) => console.log(error));

app.use(
  session({
    secret: process.env.SESSION_SECRET, // A secret key used to sign the session ID cookie
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something stored
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true, // The cookie only accessible by the web server
    },
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs: mergeSchemasArray,
  resolvers: mergeResolversArray,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/",
  cors({
    origin: "http://localhost:3000", // Allow the React app to connect to the server
    credentials: true, // Enable cookies
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }), // Pass the request to the resolvers
  })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDb();

console.log(`🚀 Server ready at http://localhost:4000/`);

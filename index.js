import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { connectDb } from "./db/connectDb.js";
import mergeSchemasArray from "./schemas/index.js";
import mergeResolversArray from "./resolvers/index.js";

import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import RequireAuth from "./middlewares/requireAuth.js";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: mergeSchemasArray,
  resolvers: mergeResolversArray,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

app.use(cors({
  origin: "http://localhost:3000",  // Permitir solo solicitudes desde http://localhost:3000
  credentials: true,  // Habilitar cookies, si es necesario
}));

await server.start();

// Middlewares de Express
app.use(express.json());

// Middleware de autenticación antes de Apollo Server
app.use("/", RequireAuth);

// Middleware de Apollo Server
app.use(
  "/",
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return {
        user: req.user,
        req,
        res,
      };
    },
  })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDb();

console.log(`🚀 Server ready at http://localhost:4000/`);

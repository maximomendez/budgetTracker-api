import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import mergeSchemasArray from "./schemas/index.js";
import mergeResolversArray from "./resolvers/index.js";

const server = new ApolloServer({
  typeDefs: mergeSchemasArray,
  resolvers: mergeResolversArray,
})
 
const { url } = await startStandaloneServer(server)
 
console.log(`🚀 Server ready at ${url}`)
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { typeDefs } from "./schemas/index.js";
import { resolvers } from "./resolvers/index.js";
 
const server = new ApolloServer({
  typeDefs,
  resolvers,
})
 
const { url } = await startStandaloneServer(server)
 
console.log(`🚀 Server ready at ${url}`)
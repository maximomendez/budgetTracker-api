// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const userSchema = `#graphql
  type Query {
    getUsers: [User!]!
    getUser(id: ID!): User!
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    telephone: String
    city: String
    state: String
    latitude: Float
    longitude: Float
  }
`;

export default userSchema;

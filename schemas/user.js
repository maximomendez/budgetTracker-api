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
    username: String!
    name: String!
    password: String!
    profilePicture: String!
    gender: Gender!
  }

  enum Gender {
    male
    female
  }
`;

export default userSchema;

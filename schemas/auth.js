const authSchema = `#graphql
  type Query {
    _empty: String
  }

  type Mutation {
    getUserAuthenticated: User!
    signUp(signUpInput: SignUpInput!): User!
    login(loginInput: LoginInput!): User!
    logout: String!
  }

  input SignUpInput {
    username: String!
    name: String!
    email: String!
    password: String!
    gender: Gender!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`

export default authSchema;
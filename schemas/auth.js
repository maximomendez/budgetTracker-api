const authSchema = `#graphql
  type Query {
    getUserAuthenticated: User
  }

  type Mutation {
    signUp(signUpInput: SignUpInput!): UserAuthenticated!
    login(loginInput: LoginInput!): UserAuthenticated!
  }

  type UserAuthenticated {
    User: User!
    token: String!
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
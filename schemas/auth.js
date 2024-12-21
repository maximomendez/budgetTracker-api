const authSchema = `#graphql
  type Query {
    _empty: String
  }

  type mutation {
    signUp(signUpInput: SignUpInput!): User!
    login(loginInput: LoginInput!): User!
    logout: String!
  }

  type SignUpInput {
    name: String!
    email: String!
    password: String!
    gender: String!
  }

  type LoginInput {
    email: String!
    password: String!
  }
`

export default authSchema;
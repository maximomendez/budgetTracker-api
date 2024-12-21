const transactionSchema = `#graphql
    type Transaction {
        id: ID!
        userId: ID!
        description: String!
        paymentMethod: String!
        category: String!
        amount: Float!
        location: String
        date: String!
    }

    type Query {
        getTransactions: [Transaction]!
        getTransaction(id: ID!): Transaction!
    }

    type mutation {
        createTransaction(transactionInput: CreateTransactionInput!): Transaction!
        updateTransaction(id: ID!, transactionInput: UpdateTransactionInput!): Transaction!
        deleteTransaction(id: ID!): Transaction!
    }

    input CreateTransactionInput {
        description: String!
        paymentMethod: String!
        category: String!
        amount: Float!
        date: String!
        location: String
    }

    input UpdateTransactionInput {
        transactionId: ID!,
        description: String,
        paymentMethod: String,
        category: String,
        amount: Float,
        location: String,
        date: String
    }
`;

export default transactionSchema;
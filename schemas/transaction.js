const transactionSchema = `#graphql
    type Transaction {
        id: ID!
        userId: ID!
        description: String!
        paymentMethod: PaymentMethod!
        category: String!
        amount: Float!
        location: String
        date: String!
    }

    type Query {
        getTransactions: [Transaction!]!
        getTransaction(id: ID!): Transaction!
    }

    type Mutation {
        createTransaction(transactionInput: CreateTransactionInput!): Transaction!
        updateTransaction(id: ID!, transactionInput: UpdateTransactionInput!): Transaction!
        deleteTransaction(id: ID!): Transaction!
    }

    input CreateTransactionInput {
        description: String!
        paymentMethod: PaymentMethod!
        category: String!
        amount: Float!
        date: String!
        location: String
    }

    input UpdateTransactionInput {
        description: String,
        paymentMethod: PaymentMethod,
        category: String,
        amount: Float,
        location: String,
        date: String
    }

    enum PaymentMethod {
        cash
        credit
        debit
    }
`;

export default transactionSchema;
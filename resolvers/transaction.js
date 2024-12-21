import { transactions } from "../seed/data.js";

const transactionResolver = {
  Query: {
    getTransactions: () => transactions,
    getTransaction: (_, { id }) => transactions.find((transaction) => transaction._id === id),
  },
};

export default transactionResolver;

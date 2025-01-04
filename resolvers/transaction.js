import Transaction from "../models/transaction.js";

const transactionResolver = {
  Query: {
    getTransactions: async (_, __, { user }) => {
      if (!user) {
        throw new Error("User not authenticated yet");
      }

      const transactions = await Transaction.find({ userId: user._id });
      return transactions
    },
    getTransaction: async (_, { id }, { user}) => {
      if (!user) {
        throw new Error("User not authenticated yet");
      }

      const transaction = Transaction.findById(id);
      return transaction;
    },
  },
  Mutation: {
    createTransaction: async (_, { transactionInput}, { user }) => {
      if (!user) {
        throw new Error("User not authenticated yet");
      }

      const transaction = new Transaction({
        ...transactionInput,
        userId: user._id,
      });

      return transaction.save();
    },

    updateTransaction: async (_, { id, transactionInput }, { user }) => {
      if (!user) {
        throw new Error("User not authenticated yet");
      }

      const transaction = await Transaction.findById(id);
      if (!transaction) {
        throw new Error("Transaction not found");
      }

      if (transaction.userId.toString() !== user._id.toString()) {
        throw new Error("You are not authorized to update this transaction");
      }

      transaction.set(transactionInput);
      return transaction.save();
    },
    deleteTransaction: async (_, { id }, { user }) => {
      if (!user) {
        throw new Error("User not authenticated yet");
      }

      const transaction = await Transaction.findById(id);

      if (!transaction) {
        throw new Error("Transaction not found");
      }

      if (transaction.userId.toString() !== user._id.toString()) {
        throw new Error("You are not authorized to delete this transaction");
      }

      await transaction.deleteOne();
      return transaction;
    }
  }
};

export default transactionResolver;

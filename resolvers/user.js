import { users } from "../seed/data.js";

const userResolvers = {
  Query: {
    getUsers: () => users,
    getUser: (_, { id }) => users.find((user) => user._id === id),
  },

  User: {
    id: (root) => root._id || root.id,
  }
};

export default userResolvers;

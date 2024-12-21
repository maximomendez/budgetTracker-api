import { users } from "../seed/data.js";

const userResolvers = {
  Query: {
    getUsers: () => users,
    getUser: (_, { id }) => users.find((user) => user._id === id),
  },
};

export default userResolvers;

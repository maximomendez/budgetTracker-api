import { mergeResolvers } from "@graphql-tools/merge";
import transactionResolver from "./transaction.js";
import userResolver from "./user.js";

const mergeResolversArray = mergeResolvers([transactionResolver, userResolver]);

export default mergeResolversArray
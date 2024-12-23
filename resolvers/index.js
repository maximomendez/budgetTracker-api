import { mergeResolvers } from "@graphql-tools/merge";
import transactionResolver from "./transaction.js";
import userResolver from "./user.js";
import authSchema from "./auth.js";

const mergeResolversArray = mergeResolvers([transactionResolver, userResolver, authSchema]);

export default mergeResolversArray
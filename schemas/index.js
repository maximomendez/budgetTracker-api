import { mergeTypeDefs } from "@graphql-tools/merge";
import transactionSchema from "./transaction.js";
import userSchema from "./user.js";
import authSchema from "./auth.js";

const mergeSchemasArray = mergeTypeDefs([transactionSchema, userSchema, authSchema]);

export default mergeSchemasArray;
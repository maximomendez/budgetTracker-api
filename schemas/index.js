import { mergeTypeDefs } from "@graphql-tools/merge";
import transactionSchema from "./transaction.js";
import userSchema from "./user.js";

const mergeSchemasArray = mergeTypeDefs([transactionSchema, userSchema]);

export default mergeSchemasArray;
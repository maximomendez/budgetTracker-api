import jwt from "jsonwebtoken";
import User from "../models/User.js";

const RequireAuth = async (req, res, next) => {
  // get query from request body
  const { query } = req.body;

  // end points allowed without authentication
  const endPointsAllowed = ["login", "signUp"];

  const isEndPointAllowed = endPointsAllowed.some((op) => query.includes(op));

  if (isEndPointAllowed) {
    return next();
  }

  // get token from headers
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  try {
    // verify token
    const decodedToken = jwt.verify(token, process.env.SESSION_SECRET);
    const { _id } = decodedToken;
    req.user = await User.findById({ _id });
    console.log("user is authenticated");
    return next();
  } catch (error) {
    console.log("Error while authenticating : ", error);
    return res.status(401).json({ error: "Request is not authorized" });
  }
};

export default RequireAuth;

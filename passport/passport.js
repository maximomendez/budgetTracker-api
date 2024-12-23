import passport from "passport";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { GraphQLLocalStrategy } from "graphql-passport";

// Configure passport
export const configurePassport = async () => {
  // Serialize and deserialize the user
  passport.serializeUser((user, done) => {
    console.log("Serializing user: ", user);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("Deserializing user: ", id);
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Use the local strategy
  passport.use(
    new GraphQLLocalStrategy(async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Invalid credentials" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          return done(null, false, { message: "Invalid Password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
};

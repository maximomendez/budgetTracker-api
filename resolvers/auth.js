import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// create token with user id
const createToken = (userId) => {
  // expiresIn is set to 1 day
  // JWT_SECRET is a secret string that is used to sign the token
  return jwt.sign({ userId }, process.env.SESSION_SECRET, { expiresIn: "1d" });
};

const authResolvers = {
  Query: {
    getUserAuthenticated: async (_, __, { user }) => {
      try {
        if (!user) {
          throw new Error("User not authenticated yet");
        }

        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    signUp: async (_, { signUpInput }) => {
      const { User } = mongoose.models;
      try {
        const { username, name, email, password, gender } = signUpInput;

        if ((!name || !email, !password, !gender)) {
          throw new Error("Please fill all fields");
        }

        const isUserRegistered = await User.findOne({ email });

        if (isUserRegistered) {
          throw new Error("User already exists");
        }

        // Hash password
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const profilePicture =
          gender === "male"
            ? `https://avatar.iran.liara.run/public/boy?username=${username}`
            : `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          email,
          name,
          password: hashedPassword,
          profilePicture,
          gender,
        });

        // Crear el token JWT
        const token = jwt.sign(
          { _id: newUser._id },
          process.env.SESSION_SECRET,
          {
            expiresIn: "1h", // Puedes ajustar la expiración según lo necesites
          }
        );

        await newUser.save();
        return { User: newUser, token };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (_, { loginInput }) => {
      try {
        const { email, password } = loginInput;

        const user = await User.findOne({
          email,
        });

        if (!user) {
          throw new Error("User does not exist");
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          throw new Error("Invalid password");
        }

        // Crear el token JWT
        const token = jwt.sign({ _id: user._id }, process.env.SESSION_SECRET, {
          expiresIn: "1h", // Puedes ajustar la expiración según lo necesites
        });

        return { User: user, token };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

export default authResolvers;

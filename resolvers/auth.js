import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const authResolvers = {
  Mutation: {
    signUp: async (_, { signUpInput }, context) => {
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

        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (_, { loginInput }, context) => {
      try {
        const { email, password } = loginInput;
        const { user, info } = await context.authenticate("graphql-local", {
          email,
          password,
        });

        if (info?.message) {
          throw new Error(info.message);
        }

        if (user) {
          await context.login(user);
          return user;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    logout: async (_, __, context) => {
      try {
        const userAuth = await context.getUser();

        if (!userAuth) {
          throw new Error("User is not login to logout yet");
        }

        await context.logout();
        context.req.session.destroy((error) => {
          if (error) {
            throw new Error("Error in destroying session");
          }
        });

        context.res.clearCookie("connect.sid");
        return "Logged out successfully";
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getUserAuthenticated: async (_, __, context) => {
      try {
        const userAuth = await context.getUser();
        
        if (!userAuth) {
          throw new Error("User not authenticated yet");
        }
        return userAuth;
        
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },
};

export default authResolvers;

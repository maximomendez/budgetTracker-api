import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"]
    },
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
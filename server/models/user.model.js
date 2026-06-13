import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User's full name is required"],
    },
    email: {
      type: String,
      required: [true, "User's email is required"],
      unique: [true, "User's email must be unique"],
    },
    password: { type: String, required: [true, "User's password is required"] },
    isAdmin: {
      type: Boolean,
      required: [true, "User's admin status is required"],
    },
  },
  {
    timeStamps: true,
    collection: "users",
  },
);

const userModel = mongoose.model("UserModel", userSchema);

export default userModel;

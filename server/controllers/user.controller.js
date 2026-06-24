import jwt from "jsonwebtoken";
import userModel from "#models/user.model.js";

/**
 * @desc  Auth user
 * @route POST/api/users/login
 * @access Public
 */

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401); //means not authorized
    throw new Error("Invalid email or password");
  }

  res.send("Auth user");
};

/**
 * @desc  Register user
 * @route POST/api/users
 * @access Public
 */

const registerUser = async (req, res) => {
  res.send("Register user");
};
/**
 * @desc  Logout user
 * @route POST/api/users
 * @access Private
 */

const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpsOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
};
/**
 * @desc  Get user profile
 * @route GET/api/users/profile
 * @access Private
 */

const getUserProfile = async (req, res) => {
  res.send("Get user profile");
};
/**
 * @desc  Update user profile
 * @route GET/api/users/profile
 * @access Private
 */

const updateUserProfile = async (req, res) => {
  res.send("Update user profile");
};
/**
 * @desc  Get all users
 * @route GET/api/users
 * @access Private/Admin
 */

const getUsers = async (req, res) => {
  res.send("Get Users");
};
/**
 * @desc  Get user by ID
 * @route GET/api/users/:id
 * @access Private/Admin
 */

const getUserById = async (req, res) => {
  res.send("Get user by ID");
};
/**
 * @desc  Delete user
 * @route Delete/api/users/:id
 * @access Private/Admin
 */

const deleteUser = async (req, res) => {
  res.send("Delete user");
};
/**
 * @desc  Update user
 * @route PUT/api/users/:id
 * @access Private/Admin
 */

const updateUser = async (req, res) => {
  res.send("Update user");
};

export {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
};

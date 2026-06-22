import userModel from "#models/user.model.js";

/**
 * @desc  Auth user
 * @route POST/api/users/login
 * @access Public
 */

const authUser = async (req, res) => {
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
  res.send("Logout user");
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

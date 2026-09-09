import asyncHandler from "express-async-handler";

import UserModel from "#models/user.model.js";
import generateToken from "#utils/generate-token.utils.js";

const publicUser = (user, token) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  isAdmin: user.isAdmin,
  createdAt: user.createdAt,
  ...(token && { token }),
});
const authUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findOne({ where: { email: req.body.email } });
  if (!user || !(await user.matchPassword(req.body.password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  const token = generateToken(res, user._id);
  res.json(publicUser(user, token));
});
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (await UserModel.findOne({ where: { email } })) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await UserModel.create({ name, email, password });
  const token = generateToken(res, user._id);
  res.status(201).json(publicUser(user, token));
});
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "User logged out" });
});
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findByPk(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(publicUser(user));
});
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findByPk(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) user.password = req.body.password;
  await user.save();
  const token = generateToken(res, user._id);
  res.json(publicUser(user, token));
});
const getUsers = asyncHandler(async (req, res) => {
  const pageSize = Math.min(Math.max(Number(req.query.pageSize) || 25, 1), 100);
  const page = Math.max(Number(req.query.pageNumber) || 1, 1);
  const { rows, count } = await UserModel.findAndCountAll({
    attributes: ["_id", "name", "email", "isAdmin", "createdAt"],
    order: [["createdAt", "DESC"]],
    offset: (page - 1) * pageSize,
    limit: pageSize,
  });
  res.json({ users: rows, page, pages: Math.ceil(count / pageSize) });
});
const getUserById = asyncHandler(async (req, res) => {
  const user = await UserModel.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
});
const deleteUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findByPk(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  if (user.isAdmin) {
    res.status(400);
    throw new Error("You cannot delete an admin user");
  }
  await user.destroy();
  res.json({ message: "User deleted successfully" });
});
const updateUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findByPk(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin;
  await user.save();
  res.json(publicUser(user));
});
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

import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import UserModel from "#models/user.model.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findByPk(decoded.id, {
        attributes: { exclude: ["password"] },
      });
      if (!req.user) throw new Error("User no longer exists");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token found");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { admin, protect };

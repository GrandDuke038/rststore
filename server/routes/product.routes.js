import {
  getProducts,
  getProductsById,
  createProduct,
} from "#controllers/product.controller.js";
import express from "express";
import { admin, protect } from "#middlewares/auth.middleware.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.route("/:id").get(getProductsById);
export default router;

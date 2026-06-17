import {
  getProducts,
  getProductsById,
} from "#controllers/product.controller.js";
import express from "express";
const router = express.Router();

router.route("/").get(getProducts);

router.route("/:id").get(getProductsById).delete(deleteProduct).put();

export default router;

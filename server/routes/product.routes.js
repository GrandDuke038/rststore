import express from "express";
import ProductModel from "#models/product.model.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await ProductModel.find({});
  res.json(products);
});
router.get("/:id", async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

export default router;

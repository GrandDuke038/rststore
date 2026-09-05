import { Op, fn, col } from "sequelize";

import ProductModel from "#models/product.model.js";
import ReviewModel from "#models/review.model.js";

const getProducts = async (req, res) => {
  const pageSize = 10;
  const page = Math.max(Number(req.query.pageNumber) || 1, 1);
  const where = req.query.keyword
    ? {
        [Op.or]: ["name", "brand", "category"].map((field) => ({
          [field]: { [Op.like]: `%${req.query.keyword}%` },
        })),
      }
    : {};
  if (req.query.cursor) where._id = { [Op.lt]: req.query.cursor };
  const { rows, count } = await ProductModel.findAndCountAll({
    where,
    attributes: [
      "_id",
      "name",
      "price",
      "image",
      "rating",
      "numReviews",
      "countInStock",
      "category",
      "brand",
    ],
    order: [["_id", "DESC"]],
    offset: req.query.cursor ? 0 : (page - 1) * pageSize,
    limit: pageSize + 1,
  });
  const hasMore = rows.length > pageSize;
  if (hasMore) rows.pop();
  res.json({
    products: rows,
    page,
    pages: Math.ceil(count / pageSize),
    nextCursor: hasMore ? rows.at(-1)._id : null,
  });
};

const getProductsById = async (req, res) => {
  const product = await ProductModel.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

const createProduct = async (req, res) => {
  const product = await ProductModel.create({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
    content: "Sample content",
  });
  res.status(201).json(product);
};
const updateProduct = async (req, res) => {
  const product = await ProductModel.findByPk(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  for (const key of [
    "name",
    "price",
    "description",
    "image",
    "brand",
    "category",
    "countInStock",
    "content",
  ])
    product[key] = req.body[key];
  await product.save();
  res.json(product);
};
const deleteProduct = async (req, res) => {
  const product = await ProductModel.findByPk(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  await product.destroy();
  res.json({ message: "Product deleted" });
};
const createProductReview = async (req, res) => {
  const product = await ProductModel.findByPk(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  try {
    await ReviewModel.create({
      product: product._id,
      user: req.user._id,
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    throw error;
  }
  const summary = await ReviewModel.findOne({
    where: { product: product._id },
    attributes: [
      [fn("AVG", col("rating")), "rating"],
      [fn("COUNT", col("_id")), "numReviews"],
    ],
    raw: true,
  });
  await product.update({
    rating: Number(summary.rating),
    numReviews: Number(summary.numReviews),
  });
  res.status(201).json({ message: "Review added" });
};
const getProductReviews = async (req, res) =>
  res.json(
    await ReviewModel.findAll({
      where: { product: req.params.id },
      attributes: ["_id", "name", "rating", "comment", "createdAt", "isDemo"],
      order: [["createdAt", "DESC"]],
    }),
  );
export {
  createProduct,
  getProducts,
  getProductsById,
  getProductReviews,
  updateProduct,
  deleteProduct,
  createProductReview,
};

import ProductModel from "#models/product.model.js";
const getProducts = async (req, res) => {
  const products = await ProductModel.find({});
  res.json(products);
};

const getProductsById = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

/**
 * @desc Create product
 * @desc POST/api/v1/products
 * @access Private/Admin
 */

const createProduct = async (req, res) => {
  const product = new ProductModel({
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

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};
export { createProduct, getProducts, getProductsById };

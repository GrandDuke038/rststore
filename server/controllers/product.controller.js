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
export { getProducts, getProductsById };

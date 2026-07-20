import ProductModel from "#models/product.model.js";
import ReviewModel from "#models/review.model.js";
/**
 * @desc		Fetch all products
 * @route		GET /api/v1/products
 * @access	Public
 */

const getProducts = async (req, res) => {
  const pageSize = 10;
  const page = Math.max(Number(req.query.pageNumber) || 1, 1);
  const cursor = req.query.cursor;
  const baseFilter = req.query.keyword
    ? { $text: { $search: req.query.keyword } }
    : {};
  const filter = { ...baseFilter };

  if (cursor) filter._id = { $lt: cursor };

  const projection = "name price image rating numReviews countInStock category brand";
  const [products, count] = await Promise.all([
    ProductModel.find(filter)
      .select(projection)
      .sort({ _id: -1 })
      .skip(cursor ? 0 : (page - 1) * pageSize)
      .limit(pageSize + 1)
      .lean(),
    ProductModel.countDocuments(baseFilter),
  ]);

  const hasMore = products.length > pageSize;
  if (hasMore) products.pop();

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    nextCursor: hasMore ? products.at(-1)._id : null,
  });
};

/**
 * @desc		Fetch single product
 * @route		GET /api/v1/products/:id
 * @access	Public
 */
const getProductsById = async (req, res) => {
  const product = await ProductModel.findById(req.params.id).lean();
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

/**
 * @desc		Update product
 * @route		PUT /api/v1/products/:id
 * @access	Private/Admin
 */
const updateProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    content,
  } = req.body;

  const product = await ProductModel.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;

    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.content = content;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

/**
 * @desc		Delete product
 * @route		DELETE /api/v1/products/:id
 * @access	Private/Admin
 */
const deleteProduct = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);

  if (product) {
    await ProductModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

/**
 * @desc Create a new review
 * POST /api/v1/products/:id/reviews
 * @access Private
 */
const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;

  const product = await ProductModel.exists({ _id: req.params.id });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  try {
    await ReviewModel.create({
      product: req.params.id,
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    throw error;
  }

  const [summary] = await ReviewModel.aggregate([
    { $match: { product: product._id } },
    { $group: { _id: "$product", rating: { $avg: "$rating" }, numReviews: { $sum: 1 } } },
  ]);
  await ProductModel.updateOne(
    { _id: product._id },
    { $set: { rating: summary.rating, numReviews: summary.numReviews } },
  );
  res.status(201).json({ message: "Review added" });
};
export {
  createProduct,
  getProducts,
  getProductsById,
  updateProduct,
  deleteProduct,
  createProductReview,
};

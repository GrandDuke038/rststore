import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "UserModel",
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    price: { type: Number, required: [true, "Product price is required"] },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    image: { type: String, required: [true, "Product image is required"] },
    brand: { type: String, required: [true, "Product brand is required"] },
    category: {
      type: String,
      required: [true, "Product category is required"],
    },
    countInStock: {
      type: Number,
      required: [true, "Product countInStock is required"],
      default: 0,
    },
    rating: {
      type: Number,
      required: [true, "Product rating is required"],
      default: 0,
    },
    numReviews: {
      type: Number,
      required: [true, "Product number of reviews is required"],
      default: 0,
    },
    content: {
      type: String,
      required: [true, "Product content is required"],
    },
  },
  {
    timestamps: true,
    collection: "products",
  },
);

// Supports the public catalogue search without collection scans.
productSchema.index({ name: "text", brand: "text", category: "text" });
productSchema.index({ createdAt: -1, _id: -1 });

const ProductModel = mongoose.model("ProductModel", productSchema);

export default ProductModel;

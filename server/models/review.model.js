import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductModel",
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    isDemo: { type: Boolean, default: false },
  },
  { timestamps: true, collection: "reviews" },
);

// Enforces one review per shopper without reading the product's review history.
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

export default mongoose.model("ReviewModel", reviewSchema);

import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "#config/db.config.js";
import ReviewModel from "#models/review.model.js";
import ProductModel from "#models/product.model.js";

dotenv.config();
await connectDB();

try {
  const cursor = ProductModel.collection.find({ "reviews.0": { $exists: true } });
  let migrated = 0;

  for await (const product of cursor) {
    const operations = product.reviews.map((review) => ({
      updateOne: {
        filter: { product: product._id, user: review.user },
        update: {
          $setOnInsert: {
            product: product._id,
            user: review.user,
            name: review.name,
            rating: review.rating,
            comment: review.comment,
            createdAt: review.createdAt || new Date(),
            updatedAt: review.updatedAt || new Date(),
          },
        },
        upsert: true,
      },
    }));

    if (operations.length) await ReviewModel.bulkWrite(operations);
    await ProductModel.collection.updateOne(
      { _id: product._id },
      { $unset: { reviews: "" } },
    );
    migrated += operations.length;
  }

  console.log(`Migrated ${migrated} reviews.`);
} finally {
  await mongoose.disconnect();
}

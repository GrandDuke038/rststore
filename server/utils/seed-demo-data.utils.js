import ProductModel from "#models/product.model.js";
import OrderModel from "#models/order.model.js";
import ReviewModel from "#models/review.model.js";
import UserModel from "#models/user.model.js";
import products from "#data/products.data.js";
import users from "#data/users.data.js";

const demoReviewTemplates = [
  {
    rating: 5,
    comment: "Great quality and exactly as described. I would happily recommend it.",
  },
  {
    rating: 4,
    comment: "Comfortable, well made, and a lovely addition to my wardrobe.",
  },
  {
    rating: 5,
    comment: "The fit and finish are excellent. It arrived looking just like the photos.",
  },
];

export const seedDemoDataIfDatabaseEmpty = async () => {
  const demoEmails = users.map(({ email }) => email);
  let demoUsers = await UserModel.find({ email: { $in: demoEmails } }).select(
    "_id email",
  );
  const existingEmails = new Set(demoUsers.map(({ email }) => email));
  const missingUsers = users.filter(({ email }) => !existingEmails.has(email));
  if (missingUsers.length) {
    demoUsers = [...demoUsers, ...(await UserModel.insertMany(missingUsers))];
  }
  const adminUser = demoUsers.find(({ email }) => email === users[0].email);

  const existingProducts = await ProductModel.find({
    name: { $in: products.map(({ name }) => name) },
  }).select("name");
  const existingNames = new Set(existingProducts.map(({ name }) => name));
  const missingProducts = products.filter(({ name }) => !existingNames.has(name));

  if (missingProducts.length) {
    await ProductModel.insertMany(
      missingProducts.map((product) => ({ ...product, user: adminUser._id })),
    );
  }

  const catalogProducts = await ProductModel.find({
    name: { $in: products.map(({ name }) => name) },
  }).select("_id");
  const productIds = catalogProducts.map(({ _id }) => _id);
  const userIds = demoUsers.slice(0, demoReviewTemplates.length).map(({ _id }) => _id);
  const existingReviews = await ReviewModel.find({
    product: { $in: productIds },
    user: { $in: userIds },
  }).select("product user");
  const existingReviewKeys = new Set(
    existingReviews.map(({ product, user }) => `${product}:${user}`),
  );
  const missingReviews = catalogProducts.flatMap(({ _id: product }) =>
    demoReviewTemplates.flatMap((review, index) => {
      const user = userIds[index];
      return existingReviewKeys.has(`${product}:${user}`)
        ? []
        : [{ product, user, name: users[index].name, ...review, isDemo: true }];
    }),
  );
  if (missingReviews.length) await ReviewModel.insertMany(missingReviews);

  if (missingReviews.length) {
    const summaries = await ReviewModel.aggregate([
      { $match: { product: { $in: productIds } } },
      { $group: { _id: "$product", rating: { $avg: "$rating" }, numReviews: { $sum: 1 } } },
    ]);
    await Promise.all(
      summaries.map(({ _id, rating, numReviews }) =>
        ProductModel.updateOne({ _id }, { $set: { rating, numReviews } }),
      ),
    );
  }

  console.log(
    `${missingProducts.length} demo products and ${missingReviews.length} demo reviews seeded.`,
  );
  return Boolean(missingProducts.length || missingReviews.length);
};

export const resetAndSeedDemoData = async () => {
  await OrderModel.deleteMany();
  await ProductModel.deleteMany();
  await UserModel.deleteMany();
  return seedDemoDataIfDatabaseEmpty();
};

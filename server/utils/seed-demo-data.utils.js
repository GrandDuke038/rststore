import ProductModel from "#models/product.model.js";
import OrderModel from "#models/order.model.js";
import OrderItemModel from "#models/order-item.model.js";
import ReviewModel from "#models/review.model.js";
import SupportModel from "#models/support.model.js";
import SupportReplyModel from "#models/support-reply.model.js";
import UserModel from "#models/user.model.js";
import products from "#data/products.data.js";
import users from "#data/users.data.js";

const templates = [{ rating: 5, comment: "Great quality and exactly as described. I would happily recommend it." }, { rating: 4, comment: "Comfortable, well made, and a lovely addition to my wardrobe." }, { rating: 5, comment: "The fit and finish are excellent. It arrived looking just like the photos." }];
export const seedDemoDataIfDatabaseEmpty = async () => {
  const demoUsers = [];
  for (const user of users) { let record = await UserModel.findOne({ where: { email: user.email } }); if (!record) record = await UserModel.create(user, { hooks: false }); demoUsers.push(record); }
  const admin = demoUsers[0]; let seeded = 0;
  for (const item of products) { const [product, created] = await ProductModel.findOrCreate({ where: { name: item.name }, defaults: { ...item, user: admin._id } }); if (created) seeded += 1; for (let index = 0; index < templates.length; index += 1) await ReviewModel.findOrCreate({ where: { product: product._id, user: demoUsers[index]._id }, defaults: { product: product._id, user: demoUsers[index]._id, name: demoUsers[index].name, ...templates[index], isDemo: true } }); }
  const summaries = await ReviewModel.findAll({ attributes: ["product"], group: ["product"] });
  for (const item of summaries) { const reviews = await ReviewModel.findAll({ where: { product: item.product } }); await ProductModel.update({ rating: reviews.reduce((total, review) => total + review.rating, 0) / reviews.length, numReviews: reviews.length }, { where: { _id: item.product } }); }
  console.log(`${seeded} demo products seeded.`); return Boolean(seeded);
};
export const resetAndSeedDemoData = async () => { await SupportReplyModel.destroy({ where: {} }); await SupportModel.destroy({ where: {} }); await OrderItemModel.destroy({ where: {} }); await OrderModel.destroy({ where: {} }); await ReviewModel.destroy({ where: {} }); await ProductModel.destroy({ where: {} }); await UserModel.destroy({ where: {} }); return seedDemoDataIfDatabaseEmpty(); };

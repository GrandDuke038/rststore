import ProductModel from "#models/product.model.js";
import OrderModel from "#models/order.model.js";
import UserModel from "#models/user.model.js";
import products from "#data/products.data.js";
import users from "#data/users.data.js";

export const seedDemoDataIfDatabaseEmpty = async () => {
  let adminUser = await UserModel.findOne({ isAdmin: true }).select("_id");
  if (!adminUser) {
    const createdUsers = await UserModel.insertMany(users);
    adminUser = createdUsers[0];
  }

  const existingProducts = await ProductModel.find({
    name: { $in: products.map(({ name }) => name) },
  }).select("name");
  const existingNames = new Set(existingProducts.map(({ name }) => name));
  const missingProducts = products.filter(({ name }) => !existingNames.has(name));

  if (!missingProducts.length) {
    console.log("Demo seed skipped: catalog is already up to date.");
    return false;
  }

  await ProductModel.insertMany(
    missingProducts.map((product) => ({ ...product, user: adminUser._id })),
  );

  console.log(`${missingProducts.length} demo products seeded.`);
  return true;
};

export const resetAndSeedDemoData = async () => {
  await OrderModel.deleteMany();
  await ProductModel.deleteMany();
  await UserModel.deleteMany();
  return seedDemoDataIfDatabaseEmpty();
};

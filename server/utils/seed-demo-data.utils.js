import ProductModel from "#models/product.model.js";
import OrderModel from "#models/order.model.js";
import UserModel from "#models/user.model.js";
import products from "#data/products.data.js";
import users from "#data/users.data.js";

export const seedDemoDataIfDatabaseEmpty = async () => {
  const [userCount, productCount, orderCount] = await Promise.all([
    UserModel.countDocuments(),
    ProductModel.countDocuments(),
    OrderModel.countDocuments(),
  ]);

  if (userCount || productCount || orderCount) {
    console.log("Demo seed skipped: database already contains data.");
    return false;
  }

  const createdUsers = await UserModel.insertMany(users);
  const adminUser = createdUsers[0]._id;
  await ProductModel.insertMany(
    products.map((product) => ({ ...product, user: adminUser })),
  );

  console.log("Demo data seeded.");
  return true;
};

export const resetAndSeedDemoData = async () => {
  await OrderModel.deleteMany();
  await ProductModel.deleteMany();
  await UserModel.deleteMany();
  return seedDemoDataIfDatabaseEmpty();
};

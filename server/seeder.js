import dotenv from "dotenv";
import colors from "colors";

import connectDB from "#config/db.config.js";
import OrderModel from "#models/order.model.js";
import ProductModel from "#models/product.model.js";
import UserModel from "#models/user.model.js";
import { resetAndSeedDemoData } from "#utils/seed-demo-data.utils.js";

dotenv.config();

const importData = async () => {
  try {
    await resetAndSeedDemoData();

    console.log("Data imported".green.bold.inverse);

    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.underline);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await OrderModel.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    console.log("Data destroyed".red.inverse);
  } catch (error) {
    console.error(`${error.message}`);
    process.exit(1);
  }
};

await connectDB();
if (process.argv[2] === "-d") await destroyData();
else await importData();

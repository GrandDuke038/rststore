import { Sequelize } from "sequelize";
import colors from "colors";
import dotenv from "dotenv";

// This module is imported before main.js and seeder.js execute their own
// dotenv.config() calls, so load the database variables before constructing Sequelize.
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_URI || "mysql://root@127.0.0.1:3306/rststore",
  {
    dialect: "mysql",
    logging: false,
    pool: { max: Number(process.env.DB_POOL_MAX) || 10, min: 0, idle: 10000 },
  },
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    const { default: initialiseModels } = await import("#models/index.js");
    initialiseModels();
    await sequelize.sync();
    console.log(
      `Database connected: ${sequelize.config.database}`.cyan.underline,
    );
  } catch (error) {
    console.error(`Database error: ${error.message}`.red.underline);
    process.exit(1);
  }
};

export { sequelize };
export default connectDB;

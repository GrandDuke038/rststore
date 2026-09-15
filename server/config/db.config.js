import colors from "colors";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

// This module is imported before main.js and seeder.js execute their own
// dotenv.config() calls, so load the database variables before constructing Sequelize.
dotenv.config();

const databaseUri =
  process.env.DB_URI || "mysql://root@127.0.0.1:3306/rststore";
const databaseUrl = new URL(databaseUri);
const sslMode = databaseUrl.searchParams.get("ssl-mode")?.toLowerCase();
const sslCertificate = process.env.DB_SSL_CA?.replace(/\\n/g, "\n");

// MySQL2 does not understand the `ssl-mode` URL parameter used by managed
// providers such as Aiven. Configure TLS through dialectOptions instead.
databaseUrl.searchParams.delete("ssl-mode");

const sslOptions =
  sslMode === "required" || process.env.DB_SSL === "true" || sslCertificate
    ? {
        ssl: sslCertificate
          ? { ca: sslCertificate, rejectUnauthorized: true }
          : { rejectUnauthorized: false },
      }
    : undefined;

const sequelize = new Sequelize(
  databaseUrl.toString(),
  {
    dialect: "mysql",
    dialectOptions: sslOptions,
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

import dotenv from "dotenv";
import colors from "colors";
import connectDB from "#config/db.config.js";
import { resetAndSeedDemoData } from "#utils/seed-demo-data.utils.js";
import { sequelize } from "#config/db.config.js";
dotenv.config();
await connectDB();
try { if (process.argv[2] === "-d") { await sequelize.truncate({ cascade: true, restartIdentity: true }); console.log("Data destroyed".red.inverse); } else { await resetAndSeedDemoData(); console.log("Data imported".green.bold.inverse); } } catch (error) { console.error(error.message.red.underline); process.exitCode = 1; } finally { await sequelize.close(); }

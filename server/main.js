import express from "express";
import colors from "colors";
import morgan from "morgan";

import dotenv from "dotenv";

import products from "#data/products.data.js";
import connectDB from "#config/db.config.js";
import productRoutes from "#routes/product.routes.js";
import { errorHandler } from "#middlewares/error.middleware.js";
import userRoutes from "#routes/user.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.PORT;
connectDB();

const app = express();
app.use(express.json()); //request body parsing
app.use(cookieParser()); //Cookies parsing

app.use(morgan("dev"));

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is running.....");
});
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port: ${port}`.yellow
      .bold,
  );
});

import express from "express";
import colors from "colors";
import morgan from "morgan";
import path from "path";

import dotenv from "dotenv";

import products from "#data/products.data.js";
import connectDB from "#config/db.config.js";
import productRoutes from "#routes/product.routes.js";
import { errorHandler } from "#middlewares/error.middleware.js";
import userRoutes from "#routes/user.routes.js";
import uploadRoutes from "#routes/upload.routes.js";
import cookieParser from "cookie-parser";
import orderRoutes from "#routes/order.routes.js";

dotenv.config();

const port = process.env.PORT;
connectDB();

const app = express();
app.use(express.json()); //request body parsing
app.use(cookieParser()); //Cookies parsing

app.use(morgan("dev"));

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/uploads", uploadRoutes);

app.use("/api/v1/config/paypal", (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

//make the uploads folder static
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.use("/*splat", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port: ${port}`.yellow
      .bold,
  );
});

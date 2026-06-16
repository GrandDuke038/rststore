import express from "express";
import colors from "colors";
import morgan from "morgan";

import dotenv from "dotenv";

import products from "#data/products.data.js";
import connectDB from "#config/db.config.js";

dotenv.config();

const port = process.env.PORT;
connectDB();

const app = express();
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API is running.....");
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});
app.get("/api/v1/products/:id", (req, res) => {
  const product = products.find((prod) => prod._id === req.params.id);
  res.json(product);
});

app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port: ${port}`.yellow
      .bold,
  );
});

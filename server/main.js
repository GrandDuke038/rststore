import colors from "colors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";

import connectDB from "#config/db.config.js";
import { errorHandler, notFound } from "#middlewares/error.middleware.js";
import orderRoutes from "#routes/order.routes.js";
import productRoutes from "#routes/product.routes.js";
import supportRoutes from "#routes/support.routes.js";
import uploadRoutes from "#routes/upload.routes.js";
import userRoutes from "#routes/user.routes.js";
import { seedDemoDataIfDatabaseEmpty } from "#utils/seed-demo-data.utils.js";

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(express.json()); //request body parsing
app.use(cookieParser()); //Cookies parsing

app.use(morgan("dev"));

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/support", supportRoutes);
app.use("/api/v1/uploads", uploadRoutes);

app.use("/api/v1/config/paypal", (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

//make the uploads folder static
const __dirname = path.resolve(); //get absolute path
app.use(
  "/uploads", //URL Prefix
  express.static(path.join(__dirname, "/uploads"), {
    maxAge: "30d",
    immutable: true,
    etag: true,
  }),
);

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

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  if (process.env.SEED_DEMO_DATA === "true") {
    await seedDemoDataIfDatabaseEmpty();
  }

  app.listen(port, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port: ${port}`.yellow
        .bold,
    );
  });
};

startServer();

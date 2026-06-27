import express from "express";
import { protect, admin } from "#middlewares/auth.middleware.js";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "#controllers/order.controllers.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getOrders);
router.route("/mine").get(protect, getMyOrders);
router.route("/:id").get(protect, admin, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;

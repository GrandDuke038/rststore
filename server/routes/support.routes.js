import express from "express";

import { admin, protect } from "#middlewares/auth.middleware.js";
import {
  addReply,
  assignTicket,
  createTicket,
  getMyTickets,
  getTicketById,
  getTickets,
  updateTicketStatus,
} from "#controllers/support.controller.js";

const router = express.Router();

router.route("/").post(protect, createTicket).get(protect, admin, getTickets);
router.route("/mine").get(protect, getMyTickets);
router.route("/:id").get(protect, getTicketById);
router.route("/:id/replies").post(protect, addReply);
router.route("/:id/status").put(protect, admin, updateTicketStatus);
router.route("/:id/assign").put(protect, admin, assignTicket);

export default router;

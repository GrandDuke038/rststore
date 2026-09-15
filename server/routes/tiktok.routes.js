import express from "express";
import { callback, creatorInfo, listVideos, startConnection, status } from "#controllers/tiktok.controller.js";
import { admin, protect } from "#middlewares/auth.middleware.js";

const router = express.Router();
router.get("/callback", callback);
router.get("/connect", protect, admin, startConnection);
router.get("/status", protect, admin, status);
router.get("/videos", protect, admin, listVideos);
router.get("/creator-info", protect, admin, creatorInfo);
export default router;

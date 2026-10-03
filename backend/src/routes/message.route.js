import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import { messageRateLimiter } from "../middleware/rateLimiter.middleware.js";

const router = express.Router();

router.use(protectRoute);
router.use(messageRateLimiter);

router.get("/users", getUsersForSidebar);
router.get("/:id", getMessages);
router.post("/send/:id", sendMessage);

export default router;

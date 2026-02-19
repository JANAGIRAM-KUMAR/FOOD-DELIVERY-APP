import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, verifyOrder, userOrders, listAllOrders, updateStatus } from "../controllers/order-controller.js";

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.post("/verify", verifyOrder);
router.post("/userorders", authMiddleware, userOrders)
router.get("/listorders", listAllOrders);
router.post("/status",updateStatus);
export default router; 
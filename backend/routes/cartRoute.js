import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cart-controller.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

router.post('/add', authMiddleware, addToCart);
router.post('/remove', authMiddleware, removeFromCart);
router.post('/get', authMiddleware, getCart);

export default router;
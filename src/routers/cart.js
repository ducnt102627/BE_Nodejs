import { Router } from "express";
import { addItemToCart, decreaseProductQuantity, getCartByUserId, increaseProductQuantity, removeFromCart, updateProductQuantity } from "../components/cart";

const router = Router();
router.get("/cart/:userId", getCartByUserId);
router.post("/cart/addToCart", addItemToCart);
router.post("/cart/remove", removeFromCart);
router.post("/cart/update", updateProductQuantity);
router.post("/cart/increase", increaseProductQuantity);
router.post("/cart/decrease", decreaseProductQuantity)
export default router;  
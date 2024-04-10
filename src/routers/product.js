import express from 'express';
import { addProduct, deleteProduct, getProducts, getProductById, updateProduct } from '../components/product';


const router = express.Router();
router.get(`/products`, getProducts);
router.get(`/products/:id`, getProductById)
router.post(`/products`, addProduct);
router.put(`/products/:id`, updateProduct);
router.delete(`/products/:id`, deleteProduct);

export default router;
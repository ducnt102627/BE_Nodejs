import { addCategory, deleteCategoryById, getCategories, getCategoryById, updateCategoryById } from '../components/category';

import express from 'express';

const router = express.Router();
router.get('/cate', getCategories);
router.get(`/cate/:id`, getCategoryById);
router.post(`/cate`, addCategory);
router.put(`/cate/:id`, updateCategoryById);
router.delete(`/cate/:id`, deleteCategoryById)
export default router;
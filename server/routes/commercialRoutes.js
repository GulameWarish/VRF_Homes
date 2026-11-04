import express from 'express';
import {
  getCommercialCategories,
  getCommercialCategoryBySlug,
  createCommercialCategory,
  updateCommercialCategory,
  deleteCommercialCategory
} from '../controllers/commercialController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCommercialCategories);
router.get('/:slug', getCommercialCategoryBySlug);
router.post('/', protect, authorize('admin', 'manager'), createCommercialCategory);
router.put('/:id', protect, authorize('admin', 'manager'), updateCommercialCategory);
router.delete('/:id', protect, authorize('admin'), deleteCommercialCategory);

export default router;

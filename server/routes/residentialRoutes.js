import express from 'express';
import {
  getResidentialCategories,
  getResidentialCategoryBySlug,
  createResidentialCategory,
  updateResidentialCategory,
  deleteResidentialCategory
} from '../controllers/residentialController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getResidentialCategories);
router.get('/:slug', getResidentialCategoryBySlug);
router.post('/', protect, authorize('admin', 'manager'), createResidentialCategory);
router.put('/:id', protect, authorize('admin', 'manager'), updateResidentialCategory);
router.delete('/:id', protect, authorize('admin'), deleteResidentialCategory);

export default router;

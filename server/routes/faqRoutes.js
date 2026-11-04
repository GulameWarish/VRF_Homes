import express from 'express';
import {
  getFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ
} from '../controllers/faqController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getFAQs);
router.post('/', protect, authorize('admin', 'manager'), createFAQ);
router.put('/:id', protect, authorize('admin', 'manager'), updateFAQ);
router.delete('/:id', protect, authorize('admin'), deleteFAQ);

export default router;

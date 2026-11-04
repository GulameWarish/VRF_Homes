import express from 'express';
import {
  submitEnquiry,
  getEnquiries,
  updateEnquiry,
  deleteEnquiry,
  exportEnquiriesCSV
} from '../controllers/enquiryController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public submission
router.post('/', submitEnquiry);

// Admin enquiry CRM
router.get('/', protect, authorize('admin', 'manager'), getEnquiries);
router.get('/export/csv', protect, authorize('admin', 'manager'), exportEnquiriesCSV);
router.put('/:id', protect, authorize('admin', 'manager'), updateEnquiry);
router.delete('/:id', protect, authorize('admin'), deleteEnquiry);

export default router;

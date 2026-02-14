import express from 'express';
import { createDonation, getDonations, getDonationById, getDashboardStats } from '../controllers/donationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', createDonation);
router.get('/', getDonations);
router.get('/stats', getDashboardStats);
router.get('/:id', getDonationById);

export default router;

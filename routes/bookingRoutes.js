import express from 'express';
import { bookSeats, getUserBookings } from '../controllers/bookingController.js';
import authChecker from '../middleware/authChecker.js';

const router = express.Router();

router.post('/', authChecker, bookSeats);              
router.get('/', authChecker, getUserBookings);        

export default router;

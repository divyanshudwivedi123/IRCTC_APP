import express from 'express';
import { addTrain, getAllTrains, getTrainById } from '../controllers/trainControllers.js';
import authChecker from '../middleware/authChecker.js';
import adminChecker from '../middleware/adminChecker.js';

const router = express.Router();

router.post('/', authChecker, adminChecker, addTrain);        
router.get('/', authChecker, getAllTrains);     
router.get('/:id', authChecker, getTrainById);

export default router;

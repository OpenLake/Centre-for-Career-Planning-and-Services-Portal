import express from 'express';
import { getStudentProfile, updateStudentProfile } from '../controllers/studentController.js';
import { protectRoute } from '../middleware/authMiddleware.js'; // assuming you have auth middleware

const router = express.Router();

router.get('/profile', protectRoute, getStudentProfile);
router.post('/profile', protectRoute, updateStudentProfile);

export default router;
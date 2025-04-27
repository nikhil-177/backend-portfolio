import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
} from '../controllers/profile.controller.js';

const router = express.Router();

router.get('/', getUserProfile);
router.put('/update', updateUserProfile);

export const profileRoutes = router;

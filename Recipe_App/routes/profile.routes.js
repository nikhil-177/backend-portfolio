import express from 'express';
import {
  deleteUserProfile,
  getUserProfile,
  updateUserProfile,
} from '../controllers/profile.controller.js';

const router = express.Router();

router.get('/', getUserProfile);
router.put('/update', updateUserProfile);
router.delete('/delete', deleteUserProfile);

export const profileRoutes = router;

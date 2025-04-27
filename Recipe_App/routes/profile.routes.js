import express from 'express';
import {
  deleteUserProfile,
  getUserProfile,
  updateUserProfile,
} from '../controllers/profile.controller.js';
import { validateProfileUpdate } from '../validators/profile.validator.js';

const router = express.Router();

router.get('/', getUserProfile);
router.put('/update', validateProfileUpdate, updateUserProfile);
router.delete('/delete', deleteUserProfile);

export const profileRoutes = router;

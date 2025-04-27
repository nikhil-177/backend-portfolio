import express from 'express';
import { getUserProfile } from '../controllers/profile.controller.js';

const router = express.Router();

router.get('/', getUserProfile);

export const profileRoutes = router;

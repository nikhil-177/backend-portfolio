import express from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/auth.controller.js';
import {
  registerDataValidation,
  validateLogin,
} from '../validators/auth.validator.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', registerDataValidation, registerUser);
router.post('/login', validateLogin, loginUser);
router.post('/logout',authMiddleware, logoutUser);

export const authRoutes = router;

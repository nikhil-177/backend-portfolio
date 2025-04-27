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

const router = express.Router();

router.post('/register', registerDataValidation, registerUser);
router.post('/login', validateLogin, loginUser);
router.post('/logout', logoutUser);

export const authRoutes = router;

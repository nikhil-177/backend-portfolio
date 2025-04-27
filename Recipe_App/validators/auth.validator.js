import { body, validationResult } from 'express-validator';
import { User } from '../models/user.model.js';

// Registration Validation Middleware
export const registerDataValidation = [
  body('name').notEmpty().withMessage('Name is required'),

  body('email')
    .isEmail()
    .withMessage('Email must be valid')
    .custom(async (email) => {
      const user = await User.findOne({ 'profile.email': email });
      if (user) {
        throw new Error('Email already exists');
      }
      return true;
    }),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Login Validation Middleware
export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid')
    .custom(async (email) => {
      const user = await User.findOne({ 'profile.email': email });
      if (!user) {
        throw new Error('Email not registered');
      }
      return true;
    }),

  body('password').notEmpty().withMessage('Password is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

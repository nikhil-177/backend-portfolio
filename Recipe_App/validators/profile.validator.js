import { body, validationResult } from 'express-validator';
import { User } from '../models/user.model.js';

// Profile Update Validation Middleware
export const validateProfileUpdate = [
  // Validate Name
  body('name')
    .optional()
    .isString()
    .withMessage('Name should be a valid string'),

  // Validate Email
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email must be valid')
    .custom(async (email, { req }) => {
      const userId = req.params.id;
      const user = await User.findOne({ 'profile.email': email });
      if (user?.profile.email === email) {
        throw new Error('Email already exists');
      }
      return true;
    }),

  body('avatar').optional().isURL().withMessage('Avatar must be a valid URL'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

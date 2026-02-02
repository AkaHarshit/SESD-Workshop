import { body } from 'express-validator';

export const registerValidation = [
  body('email').trim().isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('role').optional().isIn(['admin', 'hr', 'employee'])
];

export const loginValidation = [
  body('email').trim().isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required')
];

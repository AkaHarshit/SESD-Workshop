import { body, param, query } from 'express-validator';

export const createEmployeeValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email required'),
  body('department').trim().notEmpty().withMessage('Department is required').isLength({ max: 50 }),
  body('position').trim().notEmpty().withMessage('Position is required').isLength({ max: 100 }),
  body('salary').isFloat({ min: 0 }).withMessage('Salary must be a positive number'),
  body('hireDate').optional().isISO8601().withMessage('Invalid date'),
  body('status').optional().isIn(['active', 'on_leave', 'terminated'])
];

export const updateEmployeeValidation = [
  param('id').notEmpty().withMessage('Employee ID required'),
  body('name').optional().trim().isLength({ max: 100 }),
  body('email').optional().trim().isEmail(),
  body('department').optional().trim().isLength({ max: 50 }),
  body('position').optional().trim().isLength({ max: 100 }),
  body('salary').optional().isFloat({ min: 0 }),
  body('hireDate').optional().isISO8601(),
  body('status').optional().isIn(['active', 'on_leave', 'terminated'])
];

export const getByIdValidation = [param('id').notEmpty().withMessage('Employee ID required')];

export const listValidation = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('sortBy')
    .optional()
    .isIn(['name', 'email', 'department', 'position', 'salary', 'hireDate', 'status', 'createdAt']),
  query('sortOrder').optional().isIn(['asc', 'desc']),
  query('minSalary').optional().isFloat({ min: 0 }),
  query('maxSalary').optional().isFloat({ min: 0 })
];

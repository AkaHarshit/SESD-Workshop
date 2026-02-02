"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listValidation = exports.getByIdValidation = exports.updateEmployeeValidation = exports.createEmployeeValidation = void 0;
const express_validator_1 = require("express-validator");
exports.createEmployeeValidation = [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
    (0, express_validator_1.body)('email').trim().isEmail().withMessage('Valid email required'),
    (0, express_validator_1.body)('department').trim().notEmpty().withMessage('Department is required').isLength({ max: 50 }),
    (0, express_validator_1.body)('position').trim().notEmpty().withMessage('Position is required').isLength({ max: 100 }),
    (0, express_validator_1.body)('salary').isFloat({ min: 0 }).withMessage('Salary must be a positive number'),
    (0, express_validator_1.body)('hireDate').optional().isISO8601().withMessage('Invalid date'),
    (0, express_validator_1.body)('status').optional().isIn(['active', 'on_leave', 'terminated'])
];
exports.updateEmployeeValidation = [
    (0, express_validator_1.param)('id').notEmpty().withMessage('Employee ID required'),
    (0, express_validator_1.body)('name').optional().trim().isLength({ max: 100 }),
    (0, express_validator_1.body)('email').optional().trim().isEmail(),
    (0, express_validator_1.body)('department').optional().trim().isLength({ max: 50 }),
    (0, express_validator_1.body)('position').optional().trim().isLength({ max: 100 }),
    (0, express_validator_1.body)('salary').optional().isFloat({ min: 0 }),
    (0, express_validator_1.body)('hireDate').optional().isISO8601(),
    (0, express_validator_1.body)('status').optional().isIn(['active', 'on_leave', 'terminated'])
];
exports.getByIdValidation = [(0, express_validator_1.param)('id').notEmpty().withMessage('Employee ID required')];
exports.listValidation = [
    (0, express_validator_1.query)('page').optional().isInt({ min: 1 }),
    (0, express_validator_1.query)('limit').optional().isInt({ min: 1, max: 100 }),
    (0, express_validator_1.query)('sortBy')
        .optional()
        .isIn(['name', 'email', 'department', 'position', 'salary', 'hireDate', 'status', 'createdAt']),
    (0, express_validator_1.query)('sortOrder').optional().isIn(['asc', 'desc']),
    (0, express_validator_1.query)('minSalary').optional().isFloat({ min: 0 }),
    (0, express_validator_1.query)('maxSalary').optional().isFloat({ min: 0 })
];

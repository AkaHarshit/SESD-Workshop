"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidation = [
    (0, express_validator_1.body)('email').trim().isEmail().withMessage('Valid email required'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
    (0, express_validator_1.body)('role').optional().isIn(['admin', 'hr', 'employee'])
];
exports.loginValidation = [
    (0, express_validator_1.body)('email').trim().isEmail().withMessage('Valid email required'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required')
];

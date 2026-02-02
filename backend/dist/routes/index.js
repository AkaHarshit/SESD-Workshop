"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeeRoutes_1 = __importDefault(require("./employeeRoutes"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const router = (0, express_1.Router)();
router.use('/employees', employeeRoutes_1.default);
router.use('/auth', authRoutes_1.default);
router.get('/health', (_req, res) => {
    res.json({
        success: true,
        message: 'SESD Employee Management API',
        timestamp: new Date().toISOString()
    });
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const AppError_1 = require("../utils/AppError");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        next(new AppError_1.AppError('Access denied. No token provided.', 401));
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
        req.user = decoded;
        next();
    }
    catch {
        next(new AppError_1.AppError('Invalid or expired token', 401));
    }
};
exports.authMiddleware = authMiddleware;

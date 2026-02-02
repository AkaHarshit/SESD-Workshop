"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../utils/AppError");
const env_1 = require("../config/env");
const errorHandler = (err, _req, res, _next) => {
    if (env_1.env.nodeEnv !== 'production') {
        console.error(err);
    }
    if (err instanceof AppError_1.AppError) {
        res.status(err.statusCode).json({ success: false, error: err.message });
        return;
    }
    if (err.name === 'ValidationError') {
        res.status(400).json({ success: false, error: 'Validation failed' });
        return;
    }
    res.status(500).json({
        success: false,
        error: env_1.env.nodeEnv === 'production' ? 'Internal server error' : err.message
    });
};
exports.errorHandler = errorHandler;

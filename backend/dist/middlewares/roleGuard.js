"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRoles = void 0;
const AppError_1 = require("../utils/AppError");
const requireRoles = (...allowedRoles) => {
    return (req, _res, next) => {
        if (!req.user) {
            next(new AppError_1.AppError('Authentication required', 401));
            return;
        }
        if (!allowedRoles.includes(req.user.role)) {
            next(new AppError_1.AppError('Insufficient permissions', 403));
            return;
        }
        next();
    };
};
exports.requireRoles = requireRoles;

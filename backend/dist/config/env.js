"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    port: parseInt(process.env.PORT ?? '5000', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
    mongoUri: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/sesd_employees',
    jwtSecret: process.env.JWT_SECRET ?? 'default-secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d'
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../utils/AppError");
const env_1 = require("../config/env");
class AuthService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async register(email, password, name, role = 'employee') {
        const existing = await this.userRepository.findByEmail(email);
        if (existing) {
            throw new AppError_1.AppError('User with this email already exists', 409);
        }
        return this.userRepository.create({ email, password, name, role });
    }
    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError_1.AppError('Invalid email or password', 401);
        }
        const isValid = await user.comparePassword(password);
        if (!isValid) {
            throw new AppError_1.AppError('Invalid email or password', 401);
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id.toString(), email: user.email, role: user.role }, env_1.env.jwtSecret, { expiresIn: '7d' });
        return {
            token,
            user: {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
                role: user.role
            },
            expiresIn: env_1.env.jwtExpiresIn
        };
    }
}
exports.AuthService = AuthService;

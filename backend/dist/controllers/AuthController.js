"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_validator_1 = require("express-validator");
class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    register = async (req, res) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success: false, errors: errors.array() });
            return;
        }
        const { email, password, name, role } = req.body;
        const user = await this.authService.register(email, password, name, role);
        res.status(201).json({
            success: true,
            data: { id: user._id, email: user.email, name: user.name, role: user.role }
        });
    };
    login = async (req, res) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success: false, errors: errors.array() });
            return;
        }
        const { email, password } = req.body;
        const result = await this.authService.login(email, password);
        res.json({ success: true, data: result });
    };
    me = async (req, res) => {
        res.json({ success: true, data: req.user });
    };
}
exports.AuthController = AuthController;

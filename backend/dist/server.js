"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const env_1 = require("./config/env");
const User_1 = require("./models/User");
const startServer = async () => {
    await (0, database_1.connectDatabase)();
    const adminExists = await User_1.User.findOne({ email: 'admin@sesd.com' });
    if (!adminExists) {
        await User_1.User.create({
            email: 'admin@sesd.com',
            password: 'admin123',
            name: 'Admin',
            role: 'admin'
        });
        console.log('✓ Default admin created (admin@sesd.com / admin123)');
    }
    app_1.default.listen(env_1.env.port, () => {
        console.log(`
  ╔════════════════════════════════════════════╗
  ║  SESD Employee Management API - Running   ║
  ╠════════════════════════════════════════════╣
  ║  Base URL: http://localhost:${env_1.env.port}/api     ║
  ║  Health:   http://localhost:${env_1.env.port}/api/health  ║
  ║  Employees: http://localhost:${env_1.env.port}/api/employees  ║
  ║  Auth:     http://localhost:${env_1.env.port}/api/auth    ║
  ╚════════════════════════════════════════════╝
    `);
    });
};
startServer().catch(console.error);

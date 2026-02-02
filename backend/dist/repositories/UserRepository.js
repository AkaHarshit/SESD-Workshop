"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../models/User");
class UserRepository {
    async create(data) {
        return User_1.User.create(data);
    }
    async findByEmail(email) {
        return User_1.User.findOne({ email }).select('+password');
    }
    async findById(id) {
        return User_1.User.findById(id);
    }
}
exports.UserRepository = UserRepository;

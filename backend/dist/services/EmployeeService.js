"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const AppError_1 = require("../utils/AppError");
class EmployeeService {
    employeeRepository;
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    async create(data) {
        const existing = await this.employeeRepository.findByEmail(data.email);
        if (existing) {
            throw new AppError_1.AppError('Employee with this email already exists', 409);
        }
        if (data.salary < 0) {
            throw new AppError_1.AppError('Salary cannot be negative', 400);
        }
        return this.employeeRepository.create(data);
    }
    async getById(id) {
        const employee = await this.employeeRepository.findById(id);
        if (!employee) {
            throw new AppError_1.AppError('Employee not found', 404);
        }
        return employee;
    }
    async getList(query) {
        return this.employeeRepository.findAll(query);
    }
    async update(id, data) {
        const existing = await this.employeeRepository.findById(id);
        if (!existing) {
            throw new AppError_1.AppError('Employee not found', 404);
        }
        if (data.email && data.email !== existing.email) {
            const emailTaken = await this.employeeRepository.findByEmail(data.email);
            if (emailTaken) {
                throw new AppError_1.AppError('Email already in use by another employee', 409);
            }
        }
        if (data.salary !== undefined && data.salary < 0) {
            throw new AppError_1.AppError('Salary cannot be negative', 400);
        }
        const updated = await this.employeeRepository.update(id, data);
        if (!updated) {
            throw new AppError_1.AppError('Employee not found', 404);
        }
        return updated;
    }
    async delete(id) {
        const deleted = await this.employeeRepository.delete(id);
        if (!deleted) {
            throw new AppError_1.AppError('Employee not found', 404);
        }
    }
    async getDepartments() {
        return this.employeeRepository.getDistinctDepartments();
    }
}
exports.EmployeeService = EmployeeService;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const express_validator_1 = require("express-validator");
class EmployeeController {
    employeeService;
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    create = async (req, res) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success: false, errors: errors.array() });
            return;
        }
        const employee = await this.employeeService.create(req.body);
        res.status(201).json({ success: true, data: employee });
    };
    getById = async (req, res) => {
        const employee = await this.employeeService.getById(req.params.id);
        res.json({ success: true, data: employee });
    };
    getList = async (req, res) => {
        const query = {
            search: req.query.search,
            department: req.query.department,
            status: req.query.status,
            minSalary: req.query.minSalary ? Number(req.query.minSalary) : undefined,
            maxSalary: req.query.maxSalary ? Number(req.query.maxSalary) : undefined,
            sortBy: req.query.sortBy || 'createdAt',
            sortOrder: req.query.sortOrder || 'desc',
            page: req.query.page ? Number(req.query.page) : 1,
            limit: req.query.limit ? Number(req.query.limit) : 10
        };
        const result = await this.employeeService.getList(query);
        res.json({ success: true, ...result });
    };
    update = async (req, res) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success: false, errors: errors.array() });
            return;
        }
        const employee = await this.employeeService.update(req.params.id, req.body);
        res.json({ success: true, data: employee });
    };
    delete = async (req, res) => {
        await this.employeeService.delete(req.params.id);
        res.json({ success: true, message: 'Employee deleted successfully' });
    };
    getDepartments = async (_req, res) => {
        const departments = await this.employeeService.getDepartments();
        res.json({ success: true, data: departments });
    };
}
exports.EmployeeController = EmployeeController;

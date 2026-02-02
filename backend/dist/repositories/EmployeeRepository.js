"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRepository = void 0;
const Employee_1 = require("../models/Employee");
class EmployeeRepository {
    async create(data) {
        return Employee_1.Employee.create(data);
    }
    async findById(id) {
        return Employee_1.Employee.findById(id);
    }
    async findAll(query) {
        const { search, department, status, minSalary, maxSalary, sortBy = 'createdAt', sortOrder = 'desc', page = 1, limit = 10 } = query;
        const filter = {};
        if (search && search.trim()) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { department: { $regex: search, $options: 'i' } },
                { position: { $regex: search, $options: 'i' } }
            ];
        }
        if (department)
            filter.department = department;
        if (status)
            filter.status = status;
        if (minSalary !== undefined || maxSalary !== undefined) {
            filter.salary = {};
            if (minSalary !== undefined)
                filter.salary.$gte = minSalary;
            if (maxSalary !== undefined)
                filter.salary.$lte = maxSalary;
        }
        const validSortFields = ['name', 'email', 'department', 'position', 'salary', 'hireDate', 'status', 'createdAt'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
        const sortOpt = sortOrder === 'asc' ? 1 : -1;
        const pageNum = Math.max(1, page);
        const limitNum = Math.min(100, Math.max(1, limit));
        const skip = (pageNum - 1) * limitNum;
        const [data, totalCount] = await Promise.all([
            Employee_1.Employee.find(filter).sort({ [sortField]: sortOpt }).skip(skip).limit(limitNum),
            Employee_1.Employee.countDocuments(filter)
        ]);
        const totalPages = Math.ceil(totalCount / limitNum);
        return {
            data: data,
            pagination: {
                page: pageNum,
                limit: limitNum,
                totalCount,
                totalPages,
                hasNext: pageNum < totalPages,
                hasPrev: pageNum > 1
            }
        };
    }
    async update(id, data) {
        return Employee_1.Employee.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        const result = await Employee_1.Employee.findByIdAndDelete(id);
        return result !== null;
    }
    async findByEmail(email) {
        return Employee_1.Employee.findOne({ email });
    }
    async getDistinctDepartments() {
        const departments = await Employee_1.Employee.distinct('department');
        return departments.sort();
    }
}
exports.EmployeeRepository = EmployeeRepository;

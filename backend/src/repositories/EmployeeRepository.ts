import { Employee, IEmployeeDocument } from '../models/Employee';
import { CreateEmployeeDTO, UpdateEmployeeDTO, EmployeeListQuery } from '../types/dto';
import { PaginatedResult } from '../types';
import { IEmployeeRepository } from './IEmployeeRepository';
import { AppError } from '../utils/AppError';

export class EmployeeRepository implements IEmployeeRepository {
  async create(data: CreateEmployeeDTO): Promise<IEmployeeDocument> {
    return Employee.create(data);
  }

  async findById(id: string): Promise<IEmployeeDocument | null> {
    return Employee.findById(id);
  }

  async findAll(query: EmployeeListQuery): Promise<PaginatedResult<IEmployeeDocument>> {
    const {
      search,
      department,
      status,
      minSalary,
      maxSalary,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = query;

    const filter: Record<string, unknown> = {};

    if (search && search.trim()) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } }
      ];
    }

    if (department) filter.department = department;
    if (status) filter.status = status;
    if (minSalary !== undefined || maxSalary !== undefined) {
      filter.salary = {};
      if (minSalary !== undefined) (filter.salary as Record<string, number>).$gte = minSalary;
      if (maxSalary !== undefined) (filter.salary as Record<string, number>).$lte = maxSalary;
    }

    const validSortFields = ['name', 'email', 'department', 'position', 'salary', 'hireDate', 'status', 'createdAt'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sortOpt = sortOrder === 'asc' ? 1 : -1;

    const pageNum = Math.max(1, page);
    const limitNum = Math.min(100, Math.max(1, limit));
    const skip = (pageNum - 1) * limitNum;

    const [data, totalCount] = await Promise.all([
      Employee.find(filter).sort({ [sortField]: sortOpt }).skip(skip).limit(limitNum),
      Employee.countDocuments(filter)
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

  async update(id: string, data: UpdateEmployeeDTO): Promise<IEmployeeDocument | null> {
    return Employee.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await Employee.findByIdAndDelete(id);
    return result !== null;
  }

  async findByEmail(email: string): Promise<IEmployeeDocument | null> {
    return Employee.findOne({ email });
  }

  async getDistinctDepartments(): Promise<string[]> {
    const departments = await Employee.distinct('department');
    return departments.sort();
  }
}

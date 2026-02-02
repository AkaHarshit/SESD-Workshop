import { IEmployeeDocument } from '../models/Employee';
import { CreateEmployeeDTO, UpdateEmployeeDTO, EmployeeListQuery } from '../types/dto';
import { PaginatedResult } from '../types';
import { IEmployeeRepository } from '../repositories/IEmployeeRepository';
import { IEmployeeService } from './IEmployeeService';
import { AppError } from '../utils/AppError';

export class EmployeeService implements IEmployeeService {
  constructor(private readonly employeeRepository: IEmployeeRepository) {}

  async create(data: CreateEmployeeDTO): Promise<IEmployeeDocument> {
    const existing = await this.employeeRepository.findByEmail(data.email);
    if (existing) {
      throw new AppError('Employee with this email already exists', 409);
    }
    if (data.salary < 0) {
      throw new AppError('Salary cannot be negative', 400);
    }
    return this.employeeRepository.create(data);
  }

  async getById(id: string): Promise<IEmployeeDocument> {
    const employee = await this.employeeRepository.findById(id);
    if (!employee) {
      throw new AppError('Employee not found', 404);
    }
    return employee;
  }

  async getList(query: EmployeeListQuery): Promise<PaginatedResult<IEmployeeDocument>> {
    return this.employeeRepository.findAll(query);
  }

  async update(id: string, data: UpdateEmployeeDTO): Promise<IEmployeeDocument> {
    const existing = await this.employeeRepository.findById(id);
    if (!existing) {
      throw new AppError('Employee not found', 404);
    }
    if (data.email && data.email !== existing.email) {
      const emailTaken = await this.employeeRepository.findByEmail(data.email);
      if (emailTaken) {
        throw new AppError('Email already in use by another employee', 409);
      }
    }
    if (data.salary !== undefined && data.salary < 0) {
      throw new AppError('Salary cannot be negative', 400);
    }
    const updated = await this.employeeRepository.update(id, data);
    if (!updated) {
      throw new AppError('Employee not found', 404);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.employeeRepository.delete(id);
    if (!deleted) {
      throw new AppError('Employee not found', 404);
    }
  }

  async getDepartments(): Promise<string[]> {
    return this.employeeRepository.getDistinctDepartments();
  }
}

import { Response } from 'express';
import { validationResult } from 'express-validator';
import { IEmployeeService } from '../services/IEmployeeService';
import { AuthenticatedRequest } from '../types';
import { EmployeeListQuery } from '../types/dto';

export class EmployeeController {
  constructor(private readonly employeeService: IEmployeeService) {}

  create = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
      return;
    }
    const employee = await this.employeeService.create(req.body);
    res.status(201).json({ success: true, data: employee });
  };

  getById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const employee = await this.employeeService.getById(req.params.id);
    res.json({ success: true, data: employee });
  };

  getList = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const query: EmployeeListQuery = {
      search: req.query.search as string | undefined,
      department: req.query.department as string | undefined,
      status: req.query.status as string | undefined,
      minSalary: req.query.minSalary ? Number(req.query.minSalary) : undefined,
      maxSalary: req.query.maxSalary ? Number(req.query.maxSalary) : undefined,
      sortBy: (req.query.sortBy as string) || 'createdAt',
      sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
      page: req.query.page ? Number(req.query.page) : 1,
      limit: req.query.limit ? Number(req.query.limit) : 10
    };
    const result = await this.employeeService.getList(query);
    res.json({ success: true, ...result });
  };

  update = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
      return;
    }
    const employee = await this.employeeService.update(req.params.id, req.body);
    res.json({ success: true, data: employee });
  };

  delete = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    await this.employeeService.delete(req.params.id);
    res.json({ success: true, message: 'Employee deleted successfully' });
  };

  getDepartments = async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
    const departments = await this.employeeService.getDepartments();
    res.json({ success: true, data: departments });
  };
}

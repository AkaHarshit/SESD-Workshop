import { Response } from 'express';
import { IEmployeeService } from '../services/IEmployeeService';
import { AuthenticatedRequest } from '../types';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: IEmployeeService);
    create: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    getById: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    getList: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    update: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    delete: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    getDepartments: (_req: AuthenticatedRequest, res: Response) => Promise<void>;
}
//# sourceMappingURL=EmployeeController.d.ts.map
import { IEmployeeDocument } from '../models/Employee';
import { CreateEmployeeDTO, UpdateEmployeeDTO, EmployeeListQuery } from '../types/dto';
import { PaginatedResult } from '../types';
import { IEmployeeRepository } from '../repositories/IEmployeeRepository';
import { IEmployeeService } from './IEmployeeService';
export declare class EmployeeService implements IEmployeeService {
    private readonly employeeRepository;
    constructor(employeeRepository: IEmployeeRepository);
    create(data: CreateEmployeeDTO): Promise<IEmployeeDocument>;
    getById(id: string): Promise<IEmployeeDocument>;
    getList(query: EmployeeListQuery): Promise<PaginatedResult<IEmployeeDocument>>;
    update(id: string, data: UpdateEmployeeDTO): Promise<IEmployeeDocument>;
    delete(id: string): Promise<void>;
    getDepartments(): Promise<string[]>;
}
//# sourceMappingURL=EmployeeService.d.ts.map
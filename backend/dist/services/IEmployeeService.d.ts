import { IEmployeeDocument } from '../models/Employee';
import { CreateEmployeeDTO, UpdateEmployeeDTO, EmployeeListQuery } from '../types/dto';
import { PaginatedResult } from '../types';
export interface IEmployeeService {
    create(data: CreateEmployeeDTO): Promise<IEmployeeDocument>;
    getById(id: string): Promise<IEmployeeDocument>;
    getList(query: EmployeeListQuery): Promise<PaginatedResult<IEmployeeDocument>>;
    update(id: string, data: UpdateEmployeeDTO): Promise<IEmployeeDocument>;
    delete(id: string): Promise<void>;
    getDepartments(): Promise<string[]>;
}
//# sourceMappingURL=IEmployeeService.d.ts.map
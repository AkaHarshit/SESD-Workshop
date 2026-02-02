import { IEmployeeDocument } from '../models/Employee';
import { CreateEmployeeDTO, UpdateEmployeeDTO, EmployeeListQuery } from '../types/dto';
import { PaginatedResult } from '../types';
export interface IEmployeeRepository {
    create(data: CreateEmployeeDTO): Promise<IEmployeeDocument>;
    findById(id: string): Promise<IEmployeeDocument | null>;
    findAll(query: EmployeeListQuery): Promise<PaginatedResult<IEmployeeDocument>>;
    update(id: string, data: UpdateEmployeeDTO): Promise<IEmployeeDocument | null>;
    delete(id: string): Promise<boolean>;
    findByEmail(email: string): Promise<IEmployeeDocument | null>;
    getDistinctDepartments(): Promise<string[]>;
}
//# sourceMappingURL=IEmployeeRepository.d.ts.map
export interface CreateEmployeeDTO {
    name: string;
    email: string;
    department: string;
    position: string;
    salary: number;
    hireDate?: Date;
    status?: 'active' | 'on_leave' | 'terminated';
}
export interface UpdateEmployeeDTO {
    name?: string;
    email?: string;
    department?: string;
    position?: string;
    salary?: number;
    hireDate?: Date;
    status?: 'active' | 'on_leave' | 'terminated';
}
export interface EmployeeListQuery {
    search?: string;
    department?: string;
    status?: string;
    minSalary?: number;
    maxSalary?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}
export interface RegisterUserDTO {
    email: string;
    password: string;
    name: string;
    role?: 'admin' | 'hr' | 'employee';
}
export interface LoginUserDTO {
    email: string;
    password: string;
}
//# sourceMappingURL=dto.d.ts.map
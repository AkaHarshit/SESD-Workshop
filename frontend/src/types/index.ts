export interface Employee {
  _id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  status: 'active' | 'on_leave' | 'terminated';
  createdAt?: string;
  updatedAt?: string;
}

export interface EmployeeFormData {
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  status: 'active' | 'on_leave' | 'terminated';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

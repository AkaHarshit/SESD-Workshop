import { Request } from 'express';
export type UserRole = 'admin' | 'hr' | 'employee';
export interface IUserPayload {
    userId: string;
    email: string;
    role: UserRole;
}
export interface AuthenticatedRequest extends Request {
    user?: IUserPayload;
}
export interface PaginationQuery {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export interface PaginatedResult<T> {
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
//# sourceMappingURL=index.d.ts.map
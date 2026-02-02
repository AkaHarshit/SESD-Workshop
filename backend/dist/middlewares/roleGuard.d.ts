import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { UserRole } from '../types';
export declare const requireRoles: (...allowedRoles: UserRole[]) => (req: AuthenticatedRequest, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=roleGuard.d.ts.map
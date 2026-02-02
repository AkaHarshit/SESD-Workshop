import { Response } from 'express';
import { IAuthService } from '../services/IAuthService';
import { AuthenticatedRequest } from '../types';
export declare class AuthController {
    private readonly authService;
    constructor(authService: IAuthService);
    register: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    login: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    me: (req: AuthenticatedRequest, res: Response) => Promise<void>;
}
//# sourceMappingURL=AuthController.d.ts.map
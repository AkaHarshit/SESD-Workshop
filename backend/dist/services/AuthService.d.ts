import { IUserDocument } from '../models/User';
import { IUserRepository } from '../repositories/IUserRepository';
import { IAuthService, LoginResult } from './IAuthService';
import { UserRole } from '../types';
export declare class AuthService implements IAuthService {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    register(email: string, password: string, name: string, role?: UserRole): Promise<IUserDocument>;
    login(email: string, password: string): Promise<LoginResult>;
}
//# sourceMappingURL=AuthService.d.ts.map
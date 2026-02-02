import { IUserDocument } from '../models/User';
import { RegisterUserDTO } from '../types/dto';
import { IUserRepository } from './IUserRepository';
export declare class UserRepository implements IUserRepository {
    create(data: RegisterUserDTO): Promise<IUserDocument>;
    findByEmail(email: string): Promise<IUserDocument | null>;
    findById(id: string): Promise<IUserDocument | null>;
}
//# sourceMappingURL=UserRepository.d.ts.map
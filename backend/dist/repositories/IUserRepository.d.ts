import { IUserDocument } from '../models/User';
import { RegisterUserDTO } from '../types/dto';
export interface IUserRepository {
    create(data: RegisterUserDTO): Promise<IUserDocument>;
    findByEmail(email: string): Promise<IUserDocument | null>;
    findById(id: string): Promise<IUserDocument | null>;
}
//# sourceMappingURL=IUserRepository.d.ts.map
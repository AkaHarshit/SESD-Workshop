import { User, IUserDocument } from '../models/User';
import { RegisterUserDTO } from '../types/dto';
import { IUserRepository } from './IUserRepository';

export class UserRepository implements IUserRepository {
  async create(data: RegisterUserDTO): Promise<IUserDocument> {
    return User.create(data);
  }

  async findByEmail(email: string): Promise<IUserDocument | null> {
    return User.findOne({ email }).select('+password');
  }

  async findById(id: string): Promise<IUserDocument | null> {
    return User.findById(id);
  }
}

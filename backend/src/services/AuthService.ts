import jwt from 'jsonwebtoken';
import { IUserDocument } from '../models/User';
import { IUserRepository } from '../repositories/IUserRepository';
import { IAuthService, LoginResult } from './IAuthService';
import { AppError } from '../utils/AppError';
import { env } from '../config/env';
import { UserRole } from '../types';

export class AuthService implements IAuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  async register(
    email: string,
    password: string,
    name: string,
    role: UserRole = 'employee'
  ): Promise<IUserDocument> {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new AppError('User with this email already exists', 409);
    }
    return this.userRepository.create({ email, password, name, role });
  }

  async login(email: string, password: string): Promise<LoginResult> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      throw new AppError('Invalid email or password', 401);
    }
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email, role: user.role },
      env.jwtSecret,
      { expiresIn: '7d' }
    );
    return {
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role
      },
      expiresIn: env.jwtExpiresIn
    };
  }
}

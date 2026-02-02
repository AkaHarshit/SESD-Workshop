import { IUserDocument } from '../models/User';

export interface LoginResult {
  token: string;
  user: { id: string; email: string; name: string; role: string };
  expiresIn: string;
}

export interface IAuthService {
  register(email: string, password: string, name: string, role?: string): Promise<IUserDocument>;
  login(email: string, password: string): Promise<LoginResult>;
}

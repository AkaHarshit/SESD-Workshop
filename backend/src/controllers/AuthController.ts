import { Response } from 'express';
import { validationResult } from 'express-validator';
import { IAuthService } from '../services/IAuthService';
import { AuthenticatedRequest } from '../types';

export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  register = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
      return;
    }
    const { email, password, name, role } = req.body;
    const user = await this.authService.register(email, password, name, role);
    res.status(201).json({
      success: true,
      data: { id: user._id, email: user.email, name: user.name, role: user.role }
    });
  };

  login = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
      return;
    }
    const { email, password } = req.body;
    const result = await this.authService.login(email, password);
    res.json({ success: true, data: result });
  };

  me = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    res.json({ success: true, data: req.user });
  };
}

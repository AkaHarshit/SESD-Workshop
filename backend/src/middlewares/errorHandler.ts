import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { env } from '../config/env';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (env.nodeEnv !== 'production') {
    console.error(err);
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ success: false, error: err.message });
    return;
  }

  if (err.name === 'ValidationError') {
    res.status(400).json({ success: false, error: 'Validation failed' });
    return;
  }

  res.status(500).json({
    success: false,
    error: env.nodeEnv === 'production' ? 'Internal server error' : err.message
  });
};

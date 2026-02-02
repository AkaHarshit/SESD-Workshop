import dotenv from 'dotenv';

dotenv.config();

export interface EnvConfig {
  port: number;
  nodeEnv: string;
  mongoUri: string;
  jwtSecret: string;
  jwtExpiresIn: string;
}

export const env: EnvConfig = {
  port: parseInt(process.env.PORT ?? '5001', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  mongoUri: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/sesd_employees',
  jwtSecret: process.env.JWT_SECRET ?? 'default-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d'
};

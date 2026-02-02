import app from './app';
import { connectDatabase } from './config/database';
import { env } from './config/env';
import { User } from './models/User';

const startServer = async (): Promise<void> => {
  await connectDatabase();

  const adminExists = await User.findOne({ email: 'admin@sesd.com' });
  if (!adminExists) {
    await User.create({
      email: 'admin@sesd.com',
      password: 'admin123',
      name: 'Admin',
      role: 'admin'
    });
    console.log('✓ Default admin created (admin@sesd.com / admin123)');
  }

  app.listen(env.port, () => {
    console.log(`
  ╔════════════════════════════════════════════╗
  ║  SESD Employee Management API - Running   ║
  ╠════════════════════════════════════════════╣
  ║  Base URL: http://localhost:${env.port}/api     ║
  ║  Health:   http://localhost:${env.port}/api/health  ║
  ║  Employees: http://localhost:${env.port}/api/employees  ║
  ║  Auth:     http://localhost:${env.port}/api/auth    ║
  ╚════════════════════════════════════════════╝
    `);
  });
};

startServer().catch(console.error);

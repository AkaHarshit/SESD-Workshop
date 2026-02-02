import { Router } from 'express';
import employeeRoutes from './employeeRoutes';
import authRoutes from './authRoutes';

const router = Router();

router.use('/employees', employeeRoutes);
router.use('/auth', authRoutes);

router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'SESD Employee Management API',
    timestamp: new Date().toISOString()
  });
});

export default router;

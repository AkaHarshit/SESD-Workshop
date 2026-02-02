import { Router } from 'express';
import { EmployeeController } from '../controllers/EmployeeController';
import { EmployeeService } from '../services/EmployeeService';
import { EmployeeRepository } from '../repositories/EmployeeRepository';
import { authMiddleware } from '../middlewares/auth';
import { requireRoles } from '../middlewares/roleGuard';
import {
  createEmployeeValidation,
  updateEmployeeValidation,
  getByIdValidation,
  listValidation
} from '../middlewares/validators/employeeValidators';

const router = Router();
const employeeRepository = new EmployeeRepository();
const employeeService = new EmployeeService(employeeRepository);
const employeeController = new EmployeeController(employeeService);

router.get('/', listValidation, employeeController.getList);
router.get('/departments', employeeController.getDepartments);
router.get('/:id', getByIdValidation, employeeController.getById);

router.post(
  '/',
  authMiddleware,
  requireRoles('admin', 'hr'),
  createEmployeeValidation,
  employeeController.create
);
router.put(
  '/:id',
  authMiddleware,
  requireRoles('admin', 'hr'),
  updateEmployeeValidation,
  employeeController.update
);
router.delete(
  '/:id',
  authMiddleware,
  requireRoles('admin', 'hr'),
  getByIdValidation,
  employeeController.delete
);

export default router;

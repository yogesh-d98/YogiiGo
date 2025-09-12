import { Router } from 'express';
import * as controller from './order.controller';
import { authenticate } from '../auth/auth.middleware';
import { authorize } from '../auth/role.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { placeOrderSchema } from './order.validation';

const router = Router();

router.post('/', authenticate, validate(placeOrderSchema), controller.placeOrder);
router.get('/me', authenticate, controller.getMyOrders);
router.get('/:id', authenticate, controller.getOrder);

// update status (for merchant/delivery/admin)
router.patch('/:id/status', authenticate, authorize('merchant' as any, 'admin' as any, 'delivery' as any), controller.updateStatus);

export default router;

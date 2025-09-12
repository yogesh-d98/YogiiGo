import { Router } from 'express';
import * as controller from './cart.controller';
import { authenticate } from '../auth/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { addItemSchema, updateItemSchema } from './cart.validation';
import { authorize } from '../auth/role.middleware';

const router = Router();

router.get('/', authenticate,authorize('customer' as any), controller.getCart);
router.post('/item', authenticate, validate(addItemSchema),authorize('customer' as any), controller.addItem);
router.patch('/item', authenticate, validate(updateItemSchema),authorize('customer' as any), controller.updateItem);
router.delete('/', authenticate,authorize('customer' as any), controller.removeCart);

export default router;

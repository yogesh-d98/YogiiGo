import { Router } from 'express';
import * as controller from './store.controller';
import { validate } from '../../middlewares/validate.middleware';
import { createStoreSchema, updateStoreSchema, listStoresSchema } from './store.validation';
import { authenticate } from '../auth/auth.middleware';
import { authorize } from '../auth/role.middleware';
import { upload } from '../../middlewares/upload.middleware';
// import { validate } from '../../middlewares/validate.middleware';

const router = Router();

// public listing (cached)
router.get('/', validate(listStoresSchema), controller.getStores);
router.get('/:id', controller.getStore);

// protected routes - merchant/store owner only
router.post('/',upload.single("avatarUrl"), authenticate, authorize('merchant' as any, 'admin' as any), controller.createStore);
router.patch('/:id', authenticate, authorize('merchant' as any, 'admin' as any), validate(updateStoreSchema), controller.updateStore);
router.delete('/:id', authenticate, authorize('merchant' as any, 'admin' as any), controller.removeStore);

export default router;

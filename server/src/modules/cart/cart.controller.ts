import { Request, Response, NextFunction } from 'express';
import * as service from './cart.service';
import { sendResponse } from '../../utils/response';

export async function getCart(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return sendResponse(res, 401, 'Unauthorized');
    const cart = await service.getCartByUser(userId);
    return sendResponse(res, 200, 'Cart fetched', cart || { items: [] });
  } catch (err) { next(err); }
}

export async function addItem(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return sendResponse(res, 401, 'Unauthorized');
    const { productId, qty } = req.body;
    const updated = await service.addOrUpdateItem(userId, productId, qty);
    return sendResponse(res, 200, 'Cart updated', updated);
  } catch (err) { next(err); }
}

export async function updateItem(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return sendResponse(res, 401, 'Unauthorized');
    const { productId, qty } = req.body;
    const updated = await service.addOrUpdateItem(userId, productId, qty);
    return sendResponse(res, 200, 'Cart updated', updated);
  } catch (err) { next(err); }
}

export async function removeCart(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return sendResponse(res, 401, 'Unauthorized');
    await service.clearCart(userId);
    return sendResponse(res, 200, 'Cart cleared');
  } catch (err) { next(err); }
}

import { Request, Response, NextFunction } from 'express';
import * as service from './order.service';
import { sendResponse } from '../../utils/response';
import { validate } from '../../middlewares/validate.middleware';
import { placeOrderSchema } from './order.validation';

export async function placeOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return sendResponse(res, 401, 'Unauthorized');

    const { address, phone, paymentMethod } = req.body;
    const order = await service.placeOrder(userId, address, phone, paymentMethod);

    return sendResponse(res, 201, 'Order placed', order);
  } catch (err) {
    next(err);
  }
}

export async function getMyOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return sendResponse(res, 401, 'Unauthorized');

    const orders = await service.getOrdersByUser(userId);
    return sendResponse(res, 200, 'Orders fetched', orders);
  } catch (err) { next(err); }
}

export async function getOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const order = await service.getOrderById(req.params.id);
    if (!order) return sendResponse(res, 404, 'Order not found');

    return sendResponse(res, 200, 'Order fetched', order);
  } catch (err) { next(err); }
}

export async function updateStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { status } = req.body as { status: string };
    const order = await service.updateOrderStatus(req.params.id, status);

    if (!order) return sendResponse(res, 404, 'Order not found');

    return sendResponse(res, 200, 'Order status updated', order);
  } catch (err) { next(err); }
}

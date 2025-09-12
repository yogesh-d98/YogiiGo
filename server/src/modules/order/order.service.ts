import { Cart } from '../cart/cart.model';
import { Order } from './order.model';
import { Product } from '../product/product.model';
import { Types } from 'mongoose';
import { redis } from '../../config/redis';
import { io } from '../../server';

// helper for socket emits with logs
function emitAndLog(event: string, room: string, payload: any) {
  console.log(`[Socket Emit] Event: ${event}, Room: ${room}, Payload ID: ${payload._id}`);
  io.to(room).emit(event, payload);
}

export async function placeOrder(userId: string, address: string, phone?: string, paymentMethod?: string) {
    // get cart
    const cart = await Cart.findOne({ userId: new Types.ObjectId(userId) }).lean();
    if (!cart || !cart.items || cart.items.length === 0)
        throw { statusCode: 400, message: 'Cart is empty' };

    // Check stock and compute total
    let total = 0;
    const updates: { id: string; qty: number }[] = [];

    for (const it of cart.items) {
        const prod = await Product.findById(it.productId);
        if (!prod) throw { statusCode: 404, message: `Product ${it.productId} not found` };
        if (prod.stock < it.qty) throw { statusCode: 400, message: `Insufficient stock for ${prod.name}` };
        total += it.qty * it.price;
        updates.push({ id: (prod._id as Types.ObjectId).toString(), qty: it.qty });
    }

    // Decrement stock
    for (const u of updates) {
        await Product.findByIdAndUpdate(u.id, { $inc: { stock: -u.qty } });
    }

    // create order
    const order = await Order.create({
        userId: new Types.ObjectId(userId),
        items: cart.items.map(i => ({
            productId: i.productId,
            qty: i.qty,
            price: i.price,
            name: i.name,
            imageUrl: i.imageUrl
        })),
        total,
        address,
        phone,
        paymentMethod,
        paymentStatus: 'pending'
    });

    // clear cart
    await Cart.findOneAndDelete({ userId: new Types.ObjectId(userId) });

    // invalidate product cache
    try { await redis.del('products:all'); } catch (e) { /* ignore */ }

    // emit socket events
    emitAndLog("order:created", `user:${userId}`, order);
    emitAndLog("order:newForMerchant", "merchant_room", order);

    return order;
}

export async function getOrdersByUser(userId: string) {
    return Order.find({ userId: new Types.ObjectId(userId) })
        .sort({ createdAt: -1 })
        .lean();
}

export async function getOrderById(id: string) {
    return Order.findById(id).lean();
}

export async function updateOrderStatus(orderId: string, status: string) {
    const updated = await Order.findByIdAndUpdate(orderId, { status }, { new: true }).lean();

    if (updated) {
        emitAndLog("order:statusUpdated", `user:${updated.userId}`, updated);
    }

    return updated;
}

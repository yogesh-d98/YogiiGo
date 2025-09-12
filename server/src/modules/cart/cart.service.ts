import { Cart } from './cart.model';
import { Product } from '../product/product.model';
import { Types } from 'mongoose';

export async function getCartByUser(userId: string) {
  return Cart.findOne({ userId: new Types.ObjectId(userId) }).lean().exec();
}

export async function addOrUpdateItem(userId: string, productId: string, qty: number) {
  const prod = await Product.findById(productId).lean();
  if (!prod) throw { statusCode: 404, message: 'Product not found' };
  const price = prod.price;
  const name = prod.name;
  const imageUrl = (prod as any).imageUrl;
  const userOid = new Types.ObjectId(userId);

  const cart = await Cart.findOne({ userId: userOid });
  if (!cart) {
    const items = [{ productId: new Types.ObjectId(productId), qty, price, name, imageUrl }];
    return Cart.create({ userId: userOid, items });
  }

  const idx = cart.items.findIndex(i => i.productId.toString() === productId);
  if (idx === -1) {
    cart.items.push({ productId: new Types.ObjectId(productId), qty, price, name, imageUrl });
  } else {
    if (qty <= 0) {
      cart.items.splice(idx, 1);
    } else {
      cart.items[idx].qty = qty;
      cart.items[idx].price = price; // refresh snapshot price
    }
  }
  return cart.save();
}

export async function clearCart(userId: string) {
  return Cart.findOneAndDelete({ userId: new Types.ObjectId(userId) }).lean().exec();
}

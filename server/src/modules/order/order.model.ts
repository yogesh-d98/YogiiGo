import { Schema, model, Document, Types } from 'mongoose';

export type OrderStatus = 'created' | 'accepted' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface IOrderItem {
  productId: Types.ObjectId;
  qty: number;
  price: number;
  name?: string;
  imageUrl?: string;
}

export interface IOrder extends Document {
  userId: Types.ObjectId;
  items: IOrderItem[];
  total: number;
  address: string;
  phone?: string;
  status: OrderStatus;
  paymentMethod?: string;
  paymentStatus?: 'pending' | 'paid' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  name: { type: String },
  imageUrl: { type: String }
}, { _id: false });

const OrderSchema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: { type: [OrderItemSchema], required: true },
  total: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String },
  status: { type: String, default: 'created', index: true },
  paymentMethod: { type: String },
  paymentStatus: { type: String, default: 'pending', index: true }
}, { timestamps: true });

export const Order = model<IOrder>('Order', OrderSchema);

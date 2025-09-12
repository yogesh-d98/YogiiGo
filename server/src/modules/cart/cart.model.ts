import { Schema, model, Types, Document } from 'mongoose';

export interface ICartItem {
  productId: Types.ObjectId;
  qty: number;
  price: number; // snapshot price
  name?: string;  // snapshot name
  imageUrl?: string;
}

export interface ICart extends Document {
  userId: Types.ObjectId;
  items: ICartItem[];
  updatedAt: Date;
  createdAt: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  qty: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
  name: { type: String },
  imageUrl: { type: String }
}, { _id: false });

const CartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: { type: [CartItemSchema], default: [] }
}, { timestamps: true });

export const Cart = model<ICart>('Cart', CartSchema);

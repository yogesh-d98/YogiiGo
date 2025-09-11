// src/modules/product/product.model.ts
import { Schema, model, Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  storeId: Types.ObjectId;
  categoryId: Types.ObjectId;
  isActive: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    imageUrl: { type: String },
    storeId: { type: Schema.Types.ObjectId, ref: "Store", required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", ProductSchema);

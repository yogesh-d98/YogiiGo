// src/modules/category/category.model.ts
import { Schema, model, Document, Types } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
  storeId: Types.ObjectId;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    storeId: { type: Schema.Types.ObjectId, ref: "Store", required: true }
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", CategorySchema);

import { Schema, Types, model } from 'mongoose';

export interface IStore {
  name: string;
 ownerId: Types.ObjectId;  // ✅ fix type
  address?: string;
  phone?: string;
  isOpen?: boolean;
  geo?: { type: 'Point'; coordinates: [number, number] }; // [lng, lat]
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const StoreSchema = new Schema<IStore>(
  {
    name: { type: String, required: true, index: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    address: { type: String },
    phone: { type: String, index: true },
    isOpen: { type: Boolean, default: true, index: true },
    geo: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] },
    },
    avatarUrl: { type: String },
  },
  { timestamps: true }
);

// 2dsphere index for geo queries
StoreSchema.index({ geo: '2dsphere' });

export const Store = model<IStore>('Store', StoreSchema);

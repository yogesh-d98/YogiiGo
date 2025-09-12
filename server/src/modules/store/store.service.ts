import { Store } from './store.model';
import type { IStore } from './store.model';
import { Document, Types } from 'mongoose';

export async function createStore(data: Partial<IStore & { ownerId: string }>) {
  const doc = await Store.create({
    ...data,
    geo: data.geo ? { type: 'Point', coordinates: [data.geo.coordinates?.[0] ?? 0, data.geo.coordinates?.[1] ?? 0] } : data.geo
  } as any);
  return doc.toObject();
}

export async function getStoreById(id: string) {
  return Store.findById(id).lean().exec();
}

export async function updateStore(ownerId: string, id: string, update: Partial<IStore>) {
  // ensure owner can update only their store (assuming ownerId passed)
  return Store.findOneAndUpdate({ _id: id, ownerId: new Types.ObjectId(ownerId) }, update, { new: true }).lean().exec();
}

export async function deleteStore(ownerId: string, id: string) {
  return Store.findOneAndDelete({ _id: id, ownerId: new Types.ObjectId(ownerId) }).lean().exec();
}

// list nearby stores using geo query with optional caching handled at controller level
export async function listNearbyStores(lat?: number, lng?: number, radiusKm = 5, page = 1, limit = 20) {
  if (typeof lat === 'number' && typeof lng === 'number') {
    const meters = radiusKm * 1000;
    const skip = (page - 1) * limit;
    return Store.find({
      geo: {
        $nearSphere: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: meters
        }
      },
      isOpen: true
    })
      .select('name address avatarUrl geo isOpen')
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  } else {
    const skip = (page - 1) * limit;
    return Store.find({ isOpen: true })
      .select('name address avatarUrl geo isOpen')
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  }
}

import { Request, Response, NextFunction } from 'express';
import * as service from './store.service';
// import { sendResponse } from '../../common/response';
import { sendResponse } from "../../utils/response";
import { getOrSetCache } from '../../common/cache';
import cloudinary from '../../config/cloudinary';
// import { ENV } from '../../config/env';
// import redis from '../../config/redis';
export async function createStore(req: Request, res: Response, next: NextFunction) {
    try {
        const ownerId = (req as any).user?.id;
        if (!ownerId) return sendResponse(res, 401, 'Unauthorized');

        const { name, address, phone, isOpen, geo } = req.body;
        const lat = req.body.lat ? Number(req.body.lat) : undefined;
        const lng = req.body.lng ? Number(req.body.lng) : undefined;

        const geoField = lat && lng
            ? { type: 'Point' as 'Point', coordinates: [lng, lat] as [number, number] }
            : undefined;


        let avatarUrl = undefined;
        if (req.file && req.file.buffer) {
            avatarUrl = await new Promise<string>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: "image" },
                    (err, result) => {
                        if (err) return reject(err);
                        resolve(result?.secure_url || "");
                    }
                );
                if (req.file && req.file.buffer) {
                    stream.end(req.file.buffer);
                } else {
                    reject(new Error("File buffer is undefined"));
                }
            });
        }


        const store = await service.createStore({ name, address, phone, isOpen, geo: geoField, avatarUrl, ownerId });

        // Invalidate cache
        await (await import('../../config/redis')).redis.del('stores:all');

        return sendResponse(res, 201, 'Store created', store);
    } catch (err) {
        next(err);
    }
}


export async function getStores(req: Request, res: Response, next: NextFunction) {
    try {
        const { lat, lng, radiusKm = 5, page = 1, limit = 20 } = req.query as any;
        // build cache key
        const key = `stores:near:${lat ?? 'any'}:${lng ?? 'any'}:r${radiusKm}:p${page}:l${limit}`;

        const data = await getOrSetCache(key, 60 /* ttl seconds */, () =>
            service.listNearbyStores(lat ? Number(lat) : undefined, lng ? Number(lng) : undefined, Number(radiusKm), Number(page), Number(limit))
        );
        return sendResponse(res, 200, 'Stores fetched', data);
    } catch (err) {
        next(err);
    }
}

export async function getStore(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const store = await service.getStoreById(id);
        if (!store) return sendResponse(res, 404, 'Store not found');
        return sendResponse(res, 200, 'Store fetched', store);
    } catch (err) {
        next(err);
    }
}

export async function updateStore(req: Request, res: Response, next: NextFunction) {
    try {
        const ownerId = (req as any).user?.id;
        const id = req.params.id;
        const update = req.body;
        if (update.geo) {
            update.geo = {
                type: 'Point',
                coordinates: [update.geo.lng, update.geo.lat] as [number, number],
            };
        }

        const store = await service.updateStore(ownerId, id, update);
        if (!store) return sendResponse(res, 404, 'Store not found or not authorized');
        await (await import('../../config/redis')).redis.del('stores:all');
        return sendResponse(res, 200, 'Store updated', store);
    } catch (err) {
        next(err);
    }
}

export async function removeStore(req: Request, res: Response, next: NextFunction) {
    try {
        const ownerId = (req as any).user?.id;
        const id = req.params.id;
        const store = await service.deleteStore(ownerId, id);
        if (!store) return sendResponse(res, 404, 'Store not found or not authorized');
        await (await import('../../config/redis')).redis.del('stores:all');
        return sendResponse(res, 200, 'Store removed', store);
    } catch (err) {
        next(err);
    }
}

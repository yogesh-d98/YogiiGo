// src/modules/product/product.controller.ts
import { Request, Response, NextFunction } from "express";
import * as service from "./product.service";
import { sendResponse } from "../../utils/response";
import cloudinary from "../../config/cloudinary";

export async function createProduct(req: Request, res: Response, next: NextFunction) {
  try {
    // Parse fields safely (since form-data sends everything as string)
    const { name, description, price, categoryId, storeId,stock } = req.body;

    let parsedPrice = price ? parseFloat(price) : undefined;
    let parsedStoreId = storeId || undefined;
    let parsedCategoryId = categoryId || undefined;
    let parsedStock = stock ? parseFloat(stock) : undefined;
    // Image upload
    let imageUrl: string | undefined = req.body.imageUrl;
    if (req.file) {
      const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result as { secure_url: string });
          }
        );
        if (req.file && req.file.buffer) {
          stream.end(req.file.buffer);
        } else {
          reject(new Error("No file buffer found for upload."));
        }
      });
      imageUrl = uploadResult.secure_url;
    }

    const product = await service.createProduct({
      name,
      description,
      price: parsedPrice,
      stock:parsedStock,
      categoryId: parsedCategoryId,
      storeId: parsedStoreId,
      imageUrl,
    });

    return sendResponse(res, 201, "Product created", product);
  } catch (err) {
    next(err);
  }
}


export async function getProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const { storeId } = req.query;
    const products = await service.getProducts(storeId as string);
    return sendResponse(res, 200, "Products fetched", products);
  } catch (err) {
    next(err);
  }
}

export async function getProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await service.getProductById(req.params.id);
    return sendResponse(res, 200, "Product fetched", product);
  } catch (err) {
    next(err);
  }
}

export async function updateProduct(req: Request, res: Response, next: NextFunction) {
  try {
    let updateData = { ...req.body };

    // handle image upload if present
    if (req.file) {
      const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result as { secure_url: string });
          }
        );
        if (req.file && req.file.buffer) {
          stream.end(req.file.buffer);
        } else {
          reject(new Error("No file buffer found for upload."));
        }
      });

      updateData.imageUrl = uploadResult.secure_url;
    }

    const product = await service.updateProduct(req.params.id, updateData);
    return sendResponse(res, 200, "Product updated", product);
  } catch (err) {
    next(err);
  }
}


export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  try {
    await service.deleteProduct(req.params.id);
    return sendResponse(res, 200, "Product deleted");
  } catch (err) {
    next(err);
  }
}

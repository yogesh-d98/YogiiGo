// src/modules/category/category.controller.ts
import { Request, Response, NextFunction } from "express";
import * as service from "./category.service";
import { sendResponse } from "../../utils/response";

export async function createCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const category = await service.createCategory(req.body);
    return sendResponse(res, 201, "Category created", category);
  } catch (err) {
    next(err);
  }
}

export async function getCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const { storeId } = req.query;
    const categories = await service.getCategories(storeId as string);
    return sendResponse(res, 200, "Categories fetched", categories);
  } catch (err) {
    next(err);
  }
}

export async function getCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const category = await service.getCategoryById(req.params.id);
    return sendResponse(res, 200, "Category fetched", category);
  } catch (err) {
    next(err);
  }
}

export async function updateCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const category = await service.updateCategory(req.params.id, req.body);
    return sendResponse(res, 200, "Category updated", category);
  } catch (err) {
    next(err);
  }
}

export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  try {
    await service.deleteCategory(req.params.id);
    return sendResponse(res, 200, "Category deleted");
  } catch (err) {
    next(err);
  }
}

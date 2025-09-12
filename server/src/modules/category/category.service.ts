// src/modules/category/category.service.ts
import { Category } from "./category.model";

export const createCategory = async (data: any) => {
  return Category.create(data);
};

export const getCategories = async (storeId: string) => {
  return Category.find({ storeId });
};

export const getCategoryById = async (id: string) => {
  return Category.findById(id);
};

export const updateCategory = async (id: string, data: any) => {
  return Category.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCategory = async (id: string) => {
  return Category.findByIdAndDelete(id);
};

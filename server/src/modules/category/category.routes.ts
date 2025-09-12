// src/modules/category/category.routes.ts
import { Router } from "express";
import * as controller from "./category.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createCategorySchema, updateCategorySchema } from "./category.validation";
import { authenticate } from "../auth/auth.middleware";

const router = Router();

router.post("/", authenticate, validate(createCategorySchema), controller.createCategory);
router.get("/", controller.getCategories);
router.get("/:id", controller.getCategory);
router.put("/:id", authenticate, validate(updateCategorySchema), controller.updateCategory);
router.delete("/:id", authenticate, controller.deleteCategory);

export default router;

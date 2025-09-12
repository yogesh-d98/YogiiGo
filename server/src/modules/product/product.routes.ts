// src/modules/product/product.routes.ts
import { Router } from "express";
import * as controller from "./product.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createProductSchema, updateProductSchema } from "./product.validation";
import { authenticate } from "../auth/auth.middleware";
import { upload } from "../../middlewares/upload.middleware";
import { authorize } from "../auth/role.middleware";


const router = Router();

router.post("/", authenticate, upload.single("image"),authorize('merchant' as any, 'admin' as any), validate(createProductSchema), controller.createProduct);
router.get("/", controller.getProducts);
router.get("/:id", controller.getProduct);
router.put("/:id", authenticate,upload.single("image"),authorize('merchant' as any, 'admin' as any), validate(updateProductSchema), controller.updateProduct);
router.delete("/:id", authenticate,authorize('merchant' as any, 'admin' as any), controller.deleteProduct);

export default router;

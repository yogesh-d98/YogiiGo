import { Router } from "express";
import { authenticate } from "../auth/auth.middleware";
import { authorize } from "../auth/role.middleware";
// import { createProduct } from "./product.controller";

const router = Router();

// router.post("/", authenticate, authorize("admin"), createProduct);

export default router;

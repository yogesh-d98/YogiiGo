import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import testRoutes from "./test.routes";
import storeRoutes from "../modules/store/store.routes"
import productRoutes from "../modules/product/product.routes";
import categoryRoutes from "../modules/category/category.routes";
import cartRoutes from "../modules/cart/cart.routes";
import orderRoutes from "../modules/order/order.routes";
const router = Router();

router.use("/auth", authRoutes);
router.use("/test", testRoutes);
router.use("/store", storeRoutes); 
router.use("/product",productRoutes);
router.use("/category",categoryRoutes);
router.use("/cart",cartRoutes);
router.use("/order",orderRoutes);
export default router;

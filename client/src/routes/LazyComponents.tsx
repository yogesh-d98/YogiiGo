import { lazy } from "react";

// Lazy-loaded components
export const Login = lazy(() => import("../pages/auth/login"));
export const CustomerHome = lazy(() => import("../pages/customer/Home"));
export const StoreDashboard = lazy(() => import("../pages/store/Dashboard"));
export const Signup = lazy(() => import("../pages/auth/signUp"));

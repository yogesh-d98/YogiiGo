import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware"; // Reuse the interface
import { sendResponse } from "../../utils/response";
// roles: allowed roles for the route
export const authorize =
  (...roles: ("admin" | "customer" | "delivery")[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return sendResponse(res, 401, "User not authenticated");

    if (!roles.includes(req.user.role)) {
      return sendResponse(res, 403, "Access denied for this role");
    }

    next();
  };

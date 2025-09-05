import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { sendResponse } from "../../utils/response";

export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: "admin" | "customer" | "delivery";
    };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return sendResponse(res, 401, "Authorization token missing");
        }

        const token = authHeader.split(" ")[1];

        console.log("Token:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;


        req.user = {
            id: decoded.id as string,
            role: decoded.role as "admin" | "customer" | "delivery",
        };

        next();
    } catch (error: any) {
        return sendResponse(res, 401, "Invalid or expired token");
    }
};

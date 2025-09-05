import jwt, { Secret } from "jsonwebtoken";
import { IUser } from "./auth.model";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "defaultsecret";
const JWT_REFRESH_SECRET: Secret = (process.env.JWT_REFRESH_SECRET as Secret) || "defaultrefresh";
const ACCESS_EXPIRES = "15m" 
const REFRESH_EXPIRES = "7d"

export const generateTokens = (user: IUser) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: ACCESS_EXPIRES }
  );
  const refreshToken = jwt.sign(
    { id: user._id },
    JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_EXPIRES }
  );

  return { accessToken, refreshToken };
};
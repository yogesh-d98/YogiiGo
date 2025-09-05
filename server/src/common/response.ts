import { Response } from "express";

export const sendResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  result: any = []
) => {
  return res.status(statusCode).json({
    success,
    statusCode,
    message,
    result,
  });
};

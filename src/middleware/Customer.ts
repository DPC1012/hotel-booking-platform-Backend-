import type { NextFunction, Request, Response } from "express";

export const CustomerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.role !== "customer") {
    return res.status(403).json({
      success: false,
      data: null,
      error: "FORBIDDEN",
    });
  }
  next();
};

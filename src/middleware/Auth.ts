import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface DecodedToken {
  userId: string;
  role: string;
}
export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {authorization} = req.headers as { authorization : string};
  const token = authorization.split(" ")[1];
  if (!token) {
    res.status(401).json({
      success: false,
      data: null,
      error: "UNAUTHORIZED",
    });
    return;
  }
  try {
    const DecodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as DecodedToken;
    if (!DecodedToken) {
      res.status(401).json({
        success: false,
        data: null,
        error: "UNAUTHORIZED",
      });
      return;
    }
    (req as any).userId = DecodedToken.userId;
    (req as any).role = DecodedToken.role;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      data: null,
      error: "UNAUTHORIZED",
    });
    return;
  }
};

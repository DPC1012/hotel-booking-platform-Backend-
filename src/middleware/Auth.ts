import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface DecodedToken {
  id: string;
  role: string;
}
const { verify } = jwt
export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {authorization} = req.headers as { authorization: string};
  if (!authorization?.startsWith("Bearer "))
    return res.status(401).json({
      success: false,
      data: null,
      error: "UNAUTHORIZED",
    });
  const token = authorization.slice(7);
  if (!token) {
    return res.status(401).json({
      success: false,
      data: null,
      error: "UNAUTHORIZED",
    });
  }
  try {
    const Decoded = verify(
      token,
      process.env.JWT_SECRET || "",
    ) as DecodedToken;
    if (!Decoded) {
      return res.status(401).json({
        success: false,
        data: null,
        error: "UNAUTHORIZED",
      });
    }
    req.userId = Decoded.id;
    req.role = Decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: null,
      error: "UNAUTHORIZED",
    });
  }
};

import type { NextFunction, Request, Response } from "express";

export const CustomerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if((req as any).userId !== "customer")
    {
        res.status(403).json({
            success: false,
            data: null,
            error: "FORBIDDEN"
        })
        return;
    }
    else
    {
        next();
    }
}
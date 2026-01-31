import type { NextFunction, Request, Response } from "express";

export const OwnerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if((req as any).userId !== "owner")
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
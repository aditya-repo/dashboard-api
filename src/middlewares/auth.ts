import { Request, Response, NextFunction } from "express";

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement admin authentication logic
  // For now, allow all requests
  next();
};

import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/auth";
import { verifyAccessToken } from "../utils/tokenUtils";

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement admin authentication logic
  // For now, allow all requests
  next();
};

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({ error: "Access token required" });
    return;
  }

  try {
    // Verify the JWT token
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      res.status(403).json({ error: "Invalid or expired token" });
      return;
    }

    // Set user information in request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(403).json({ error: "Invalid or expired token" });
    return;
  }
};

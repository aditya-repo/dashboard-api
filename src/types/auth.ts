import { Request } from "express";

// Extend Request interface to include user from JWT
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    [key: string]: any;
  };
}

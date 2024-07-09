import { NextFunction, Request, Response } from "express";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['access_token'];
    if (token) {
      req.headers['authorization'] = `Bearer ${token}`;
    }
    next(); 
  };
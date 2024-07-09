import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";

export enum LoginRole {
    ADMIN = "admin",
    USER = "user"
}

export const role = (loginRole: LoginRole) => (req: Request, res: Response, next: NextFunction) => {
    if (req.body.role === loginRole) {
        delete req.body.role;
        next();
    } else next('route');
};
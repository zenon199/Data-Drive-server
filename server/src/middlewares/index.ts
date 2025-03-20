import { NextFunction,Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models";
import { Types } from "mongoose";

interface IUser {
    _id: Types.ObjectId;
    email: string;
    password: string;
}

interface CustomRequest extends Request {
    user?: IUser;
}

const JWT_SEC = process.env.JWT_SEC || "TestSecret"

export const userMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            res.status(401).json({
                message: "Invalid authorization header format"
            });
            return;
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({
                message: "No token provided"
            });
            return;
        }

        const decoded = jwt.verify(token, JWT_SEC) as JwtPayload;
        
        const user = await User.findById(decoded.id);
        if (!user) {
            res.status(404).json({
                message: "User not found"
            });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({
            message: "Authentication failed",
            error: error
        });
    }
};
import { NextFunction, Request, Response  } from "express"
import { AppError } from "../utils/AppError";
const jwt = require('jsonwebtoken')
require('dotenv').config();

function authMiddleware(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return next(new AppError("Unauthorized",401));
    }

    jwt.verify(token, process.env.JWT_SECRET, (error : any,decoded : any) =>{
        if(error) return next(new AppError("Invalid or expired token",401)); 
        next();
    })
}

export {authMiddleware}
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

function checkRoles(allowedRoles: string[]){
    return (req: Request, res: Response, next: NextFunction)=>{
        const user = req.user as { role?: string } | undefined;
        if (!user || !user.role) {
            return next(new AppError("Unauthorized", 401));
          }

        const {role} = user;
        if(role === "admin"){
            return next();
        }
        if(!role||!allowedRoles.includes(role)){
            return next(new AppError("Unauthorized",401))
        }

        next();
    }
}

export {checkRoles}
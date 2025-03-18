import {Request, Response, NextFunction, ErrorRequestHandler} from "express"
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { AppError } from "../utils/AppError";
import {ZodError} from "zod";

export const errorHandler: ErrorRequestHandler = (
    error: any,
    req: Request<ParamsDictionary, any, any, ParsedQs>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ) => {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }

    if(error instanceof ZodError){
        res.status(400).json({message: "Bad request syntax",issues: error.format()});
        return;
    }

    res.status(500).json({message:error.message})
  }